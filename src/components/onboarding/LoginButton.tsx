import { useNavigate } from 'react-router-dom';

type LoginButtonProps = {
  platform: 'google' | 'naver' | 'kakao';
};

const platformStyles: Record<string, string> = {
  google: 'bg-white text-base-900 border border-base-900',
  naver: 'bg-[#03C75A] text-white border border-[#03C75A]',
  kakao: 'bg-[#FEE500] text-base-900',
};

const platformNames: Record<string, string> = {
  google: 'Google',
  naver: 'Naver',
  kakao: '카카오톡으',
};

const LoginButton = ({ platform }: LoginButtonProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: 실제 로그인 로직 구현, 신규회원일 시 온보딩, 기존회원일 시 메인페이지로 이동
    navigate('/onboarding?step=1');
  };

  return (
    <button
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3 ${platformStyles[platform]}`}
      onClick={handleLogin}
    >
      <img src={`/icons/login/${platform}.svg`} alt={`${platform} Logo`} className="h-6 w-6" />
      <span className="text-body-16B">{`${platformNames[platform]}로 시작하기`}</span>
    </button>
  );
};

export default LoginButton;
