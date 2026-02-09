import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnalysisPage from '../../pages/job/AnalysisPage';
import { getPortfolioStatus } from '../../apis/portfolio';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const LoadingPolling = () => {
  const navigate = useNavigate();
  const { id: categoryId } = useParams<{ id: string }>();
  const portfolioId = usePortfolioStore((state) => state.portfolioId);
  const [pollingCount, setPollingCount] = useState(0);

  useEffect(() => {
    if (!portfolioId) {
      console.error('portfolioId가 없습니다.');
      // TODO: 에러 페이지로 이동
      return;
    }

    const maxPolling = 60; // 최대 60회 (3분, 3초마다 폴링)
    let pollingTimer: ReturnType<typeof setTimeout>;

    const checkStatus = async () => {
      try {
        const response = await getPortfolioStatus(portfolioId);
        const status = response.status;

        console.log(`폴링 ${pollingCount + 1}회: ${status}`);

        if (status === 'COMPLETED') {
          // 분석 완료 -> 결과 페이지
          navigate('/job/result');
          return;
        }

        if (status === 'RETRY_REQUIRED') {
          // 추가 정보 필요 -> 설문 페이지
          navigate(`/setup/category/${categoryId}?step=3`);
          return;
        }

        if (status === 'FAILED') {
          // 분석 실패 처리
          console.error('분석 실패');
          alert('분석에 실패했습니다. 다시 시도해주세요.');
          navigate(`/setup/category/${categoryId}?step=2`);
          return;
        }

        // PENDING or PROCESSING -> 계속 폴링
        setPollingCount((prev) => prev + 1);

        if (pollingCount < maxPolling - 1) {
          pollingTimer = setTimeout(checkStatus, 3000); // 3초마다 체크
        } else {
          // 타임아웃
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

    // 최초 실행 (컴포넌트 마운트 후 바로 시작)
    checkStatus();

    return () => {
      if (pollingTimer) clearTimeout(pollingTimer);
    };
  }, [portfolioId, navigate, categoryId, pollingCount]);

  return <AnalysisPage />;
};

export default LoadingPolling;
