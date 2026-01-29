import { useSearchParams, useParams } from 'react-router-dom';
import CategoryIntro from '../../components/setup/CategoryIntro';
import CategorySummary from '../../components/setup/CategorySummary';
import SurveyStep from '../../components/setup/SurveyStep';

const CategoryDetailPage = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const step = searchParams.get('step') || '1';

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {step === '1' && <CategoryIntro categoryId={id!} />}
      {step === '2' && <CategorySummary categoryId={id!} />}
      {step === '3' && <SurveyStep />}
    </div>
  );
};

export default CategoryDetailPage;
