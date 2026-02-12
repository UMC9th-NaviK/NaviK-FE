import { useNavigate } from 'react-router-dom';
import ButtonRound from '../common/ButtonRound';
import JobSummary from './JobSummary';
import JobKpi from './JobKpi';
import { getJobSummary } from '../../constants/keyKPI';
import NoteActivity from './NoteActivity';
import { useEffect, useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { postPortfolio } from '../../apis/portfolio';
import { uploadPortfolioPdf } from '../../apis/s3';
import { useUserId } from '../../hooks/useUser';
import { convertJobToShortCode, useUserStore } from '../../store/useUserStore';
import { getUserInfo } from '../../apis/user';

const CategorySummary = ({ categoryId }: { categoryId: string }) => {
  const navigate = useNavigate();
  const summary = getJobSummary(categoryId);
  const setPortfolioId = usePortfolioStore((state) => state.setPortfolioId);

  const [noteHasInput, setNoteHasInput] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = useUserId();

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!userId) {
        try {
          const profile = await getUserInfo();
          useUserStore.getState().setUser({
            name: profile.name,
            userId: profile.id,
            nickname: profile.nickname,
            job: convertJobToShortCode(profile.job),
          });
          console.log('✅ User profile loaded');
        } catch (error) {
          console.error('❌ Failed to load user profile:', error);
        }
      }
    };

    loadUserProfile();
  }, [userId]);

  const handleNext = async () => {
    if (!userId) {
      alert('사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      let portfolioData;

      if (noteFile) {
        const key = await uploadPortfolioPdf(userId, noteFile);

        portfolioData = {
          inputType: 'PDF' as const,
          fileUrl: key, // "pdf/raw/11/2026-02-10_e86fc3b5.pdf" 형태
        };
      } else {
        // TEXT 모드: content만 전송
        portfolioData = {
          inputType: 'TEXT' as const,
          content: noteContent,
        };
      }

      console.log('📤 포트폴리오 요청 데이터:', portfolioData);

      const response = await postPortfolio(portfolioData);
      console.log('✅ 포트폴리오 생성 성공:', response);

      setPortfolioId(response.id);
      navigate(`/setup/category/${categoryId}?step=loading`);
    } catch (error) {
      console.error('❌ 포트폴리오 등록 실패:', error);
      alert('포트폴리오 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!summary) {
    return null;
  }

  return (
    <div className="bg-white-background relative overflow-hidden px-6 pt-6.5 pb-26">
      <div className="relative z-10 flex flex-col gap-6">
        <JobSummary job={summary.job} title={summary.title} body={summary.body} />
        <JobKpi categoryId={categoryId} />
        <NoteActivity
          onInputChange={setNoteHasInput}
          onContentChange={setNoteContent}
          onFileChange={setNoteFile}
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-6">
        <ButtonRound
          onClick={handleNext}
          text={isSubmitting ? '제출 중...' : '다음'}
          disabled={!noteHasInput || isSubmitting || (!noteFile && !noteContent.trim())}
        />
      </div>
      <div className="radial-blue pointer-events-none absolute bottom-0 left-1/2 z-5 h-157 w-157 -translate-x-1/2 translate-y-1/3 rounded-full" />
    </div>
  );
};

export default CategorySummary;
