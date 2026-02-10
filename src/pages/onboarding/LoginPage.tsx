import { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';
import LoginButtonList from '../../components/onboarding/LoginButtonList';

const LoginPage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3600);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="flex h-dvh items-center justify-center px-4">
      <div className="flex w-full flex-col gap-20">
        <div className="flex flex-col items-center gap-4">
          <img src="/icons/reports/logo-blue.svg" alt="NaviK Logo" className="h-7.6 w-49" />
          <p className="text-body-14M text-primary-blue-500">
            성장의 방향을 설계하는 커리어 나침반, 나빅
          </p>
        </div>
        <div className="flex flex-col gap-16">
          <p className="text-heading-20B text-base-900 text-center whitespace-pre-line">{`쉽게 가입하고\n간편하게 로그인하세요`}</p>
          <LoginButtonList />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
