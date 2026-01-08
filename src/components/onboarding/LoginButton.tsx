type LoginButtonProps = {
  platform: 'google' | 'naver' | 'kakao';
  onClick?: () => void;
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

const LoginButton = ({ platform, onClick }: LoginButtonProps) => {
  return (
    <button
      className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 ${platformStyles[platform]}`}
      onClick={onClick}
    >
      <img src={`/icons/login/${platform}.svg`} alt={`${platform} Logo`} className="h-6 w-6" />
      <span className="text-body-16B">{`${platformNames[platform]}로 시작하기`}</span>
    </button>
  );
};

export default LoginButton;
