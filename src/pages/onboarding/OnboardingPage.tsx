import { useSearchParams } from 'react-router-dom';
import PolicyPage from './PolicyPage';
import ProfileInputPage from './ProfileInputPage';
import PolicyDetailView from './PolicyDetailPage';

const OnboardingPage = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const detail = searchParams.get('detail');

  if (detail && step === '1') {
    return <PolicyDetailView policyId={detail} />;
  }

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <img
        src="/images/big-symbol-blue.svg"
        alt="NaviK Logo"
        className="pointer-events-none absolute bottom-4.5 left-0 z-0"
      />
      {step === '1' && <PolicyPage />}
      {step === '2' && <ProfileInputPage />}
    </div>
  );
};

export default OnboardingPage;
