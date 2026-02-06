import { useState, useEffect } from 'react';
import ButtonRound from '../common/ButtonRound';
import { useNavigate } from 'react-router-dom';
import SurveyItem from './SurveyItem';
import { getSurveyQuestions } from '../../constants/survey';
import AnalysisPage from '../../pages/job/AnalysisPage';

const SurveyStep = ({ categoryId }: { categoryId: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const questions = getSurveyQuestions(categoryId);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    setIsLoading(true);
    // 테스트용: 3초 후 페이지 이동
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/job/result`);
    }, 3000);
  };

  const isAllAnswered = questions.length === Object.keys(answers).length;

  if (isLoading) {
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
        <ButtonRound onClick={handleNext} text="다음" disabled={!isAllAnswered} />
      </div>
    </>
  );
};

export default SurveyStep;
