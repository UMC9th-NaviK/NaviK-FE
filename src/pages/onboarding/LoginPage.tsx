import { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';
import LoginButtonList from '../../components/onboarding/LoginButtonList';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus } from '../../apis/auth';

const LoginPage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndSplash = async () => {
      const splashTimer = new Promise<void>((resolve) => setTimeout(resolve, 3600));
      const authCheck = checkAuthStatus();

      const [, isLoggedIn] = await Promise.all([splashTimer, authCheck]);

      if (isLoggedIn) {
        navigate('/home', { replace: true });
      } else {
        setShowSplash(false);
      }
    };

    checkAuthAndSplash();
  }, [navigate]);

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
