import { useState, useEffect } from 'react';
import ButtonRound from '../common/ButtonRound';
import { useNavigate } from 'react-router-dom';
import SurveyItem from './SurveyItem';
import { getSurveyQuestions } from '../../constants/survey';
import AnalysisPage from '../../pages/job/AnalysisPage';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import type { RequestPortfolioInfo } from '../../types/portfolio';
import { usePostAdditionalInfo } from '../../hooks/queries/usePortfolio';

const SurveyStep = ({ categoryId }: { categoryId: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const questions = getSurveyQuestions(categoryId);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const portfolioId = usePortfolioStore((state) => state.portfolioId);
  const { mutateAsync: submitAdditionalInfo } = usePostAdditionalInfo();

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = async () => {
    if (!portfolioId) {
      alert('포트폴리오 정보가 없습니다. 다시 시도해주세요.');
      navigate(`/setup/category/${categoryId}?step=2`);
      return;
    }

    try {
      setIsSubmitting(true);

      const additionalInfo: RequestPortfolioInfo = {
        qB1: answers[1] ?? 0,
        qB2: answers[2] ?? 0,
        qB3: answers[3] ?? 0,
        qB4: answers[4] ?? 0,
        qB5: answers[5] ?? 0,
      };

      console.log('📤 추가 정보 제출:', { portfolioId, additionalInfo });

      await submitAdditionalInfo({
        portfolioId,
        info: additionalInfo,
      });

      console.log('✅ 추가 정보 제출 성공');

      // 제출 후 다시 로딩 폴링으로 이동
      navigate(`/setup/category/${categoryId}?step=loading`);
    } catch (error) {
      console.error('❌ 추가 정보 제출 실패:', error);
      alert('추가 정보 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAllAnswered = questions.length === Object.keys(answers).length;

  if (isSubmitting) {
    return <AnalysisPage />;
  }

  return (
    <>
      <div className="bg-white-background flex flex-col gap-6 px-6 pt-6.5 pb-26">
        <div className="flex flex-col gap-2">
          <p className="text-heading-20B text-base-900">간단한 질문에 답해주세요 💬</p>
          <p className="text-body-14M text-opacity-black-60">
            경험 기록과 간단한 진단을 통해
            <br /> 항해자님의 직무 방향성을 보여드릴게요!
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {questions.map((question) => (
            <SurveyItem
              key={question.id}
              number={question.id}
              title={question.question}
              selectedValue={answers[question.id]}
              onSelect={(value) => handleAnswerChange(question.id, value)}
            />
          ))}
        </div>
      </div>
      {/* 버튼 - 하단 고정 */}
      <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-6">
        <ButtonRound
          onClick={handleNext}
          text={isSubmitting ? '제출 중...' : '다음'}
          disabled={!isAllAnswered || isSubmitting}
        />
      </div>
    </>
  );
};

export default SurveyStep;
