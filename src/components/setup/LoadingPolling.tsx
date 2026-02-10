import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnalysisPage from '../../pages/job/AnalysisPage';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { getPortfolioStatus } from '../../apis/portfolio';

const LoadingPolling = () => {
  const navigate = useNavigate();
  const { id: categoryId } = useParams<{ id: string }>();
  const portfolioId = usePortfolioStore((state) => state.portfolioId);
  const pollingCountRef = useRef(0);
  const pollingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!portfolioId) {
      console.error('portfolioId가 없습니다.');
      return;
    }

    const maxPolling = 60; // 최대 60회 (3분)

    const checkStatus = async () => {
      try {
        pollingCountRef.current += 1;
        console.log(`폴링 ${pollingCountRef.current}회 시작`);

        const response = await getPortfolioStatus(portfolioId);
        const status = response.status;

        console.log(`상태: ${status}`);

        if (status === 'COMPLETED') {
          console.log('분석 완료');
          navigate('/job/result');
          return;
        }

        if (status === 'RETRY_REQUIRED') {
          console.log('추가 정보 필요');
          navigate(`/setup/category/${categoryId}?step=3`);
          return;
        }

        if (status === 'FAILED') {
          console.error('분석 실패');
          alert('분석에 실패했습니다. 다시 시도해주세요.');
          navigate(`/setup/category/${categoryId}?step=2`);
          return;
        }

        // PENDING or PROCESSING -> 계속 폴링
        if (pollingCountRef.current < maxPolling) {
          console.log(`3초 후 재시도 (${pollingCountRef.current}/${maxPolling})`);
          pollingTimerRef.current = setTimeout(checkStatus, 3000);
        } else {
          console.error('분석 시간 초과');
          alert('분석 시간이 초과되었습니다. 다시 시도해주세요.');
          navigate(`/setup/category/${categoryId}?step=2`);
        }
      } catch (error) {
        console.error('상태 조회 실패:', error);
        alert('상태 조회에 실패했습니다. 다시 시도해주세요.');
        navigate(`/setup/category/${categoryId}?step=2`);
      }
    };

    // 최초 실행
    console.log('=== 폴링 시작 ===');
    checkStatus();

    return () => {
      console.log('=== 폴링 중단 ===');
      if (pollingTimerRef.current) {
        clearTimeout(pollingTimerRef.current);
      }
    };
  }, [portfolioId, navigate, categoryId]);

  return <AnalysisPage />;
};

export default LoadingPolling;
