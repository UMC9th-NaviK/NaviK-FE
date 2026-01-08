import { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';

const LoginPage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return <div>Login Page</div>;
};

export default LoginPage;
