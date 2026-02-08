type LoginButtonProps = {
  platform: 'google' | 'naver' | 'kakao';
};

const clearAuthStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

const handleKakaoLogin = () => {
  clearAuthStorage();
  localStorage.setItem('oauthProvider', 'kakao');
  const oauthUrl = `${import.meta.env.VITE_OAUTH_API_URL}/oauth2/authorization/kakao`;
  window.location.href = oauthUrl;
};

const handleGoogleLogin = () => {
  clearAuthStorage();
  localStorage.setItem('oauthProvider', 'google');
  const oauthUrl = `${import.meta.env.VITE_OAUTH_API_URL}/oauth2/authorization/google`;
  window.location.href = oauthUrl;
};

const handleNaverLogin = () => {
  clearAuthStorage();
  localStorage.setItem('oauthProvider', 'naver');
  const oauthUrl = `${import.meta.env.VITE_OAUTH_API_URL}/oauth2/authorization/naver`;
  window.location.href = oauthUrl;
};

const platformConfig = {
  google: {
    name: 'Google',
    imageSrc: '/icons/login/google.svg',
    bgColor: 'bg-white',
    textColor: 'text-base-900',
    borderColor: 'border border-base-900',
    onClick: handleGoogleLogin,
  },
  naver: {
    name: 'Naver',
    imageSrc: '/icons/login/naver.svg',
    bgColor: 'bg-[#03C75A]',
    textColor: 'text-white',
    borderColor: 'border border-[#03C75A]',
    onClick: handleNaverLogin,
  },
  kakao: {
    name: '카카오톡',
    imageSrc: '/icons/login/kakao.svg',
    bgColor: 'bg-[#FEE500]',
    textColor: 'text-base-900',
    borderColor: 'border border-[#FEE500]',
    onClick: handleKakaoLogin,
  },
};

const LoginButton = ({ platform }: LoginButtonProps) => {
  const config = platformConfig[platform];

  return (
    <button
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3 ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      onClick={config.onClick}
    >
      <img src={config.imageSrc} alt={`${config.name} Logo`} className="h-6 w-6" />
      <span className="text-body-16B">{`${config.name}로 시작하기`}</span>
    </button>
  );
};

export default LoginButton;
