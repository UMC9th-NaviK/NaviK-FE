import { useSearchParams, useParams } from 'react-router-dom';
import CategoryIntro from '../../components/setup/CategoryIntro';
import CategorySummary from '../../components/setup/CategorySummary';
import SurveyStep from '../../components/setup/SurveyStep';
import LoadingPolling from '../../components/setup/LoadingPolling';

const CategoryDetailPage = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const step = searchParams.get('step') || '1';

  if (!id) {
    return <div>카테고리를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {step === '1' && <CategoryIntro categoryId={id} />}
      {step === '2' && <CategorySummary categoryId={id} />}
      {step === 'loading' && <LoadingPolling />}
      {step === '3' && <SurveyStep categoryId={id} />}
    </div>
  );
};

export default CategoryDetailPage;
