import LoginButton from './LoginButton';

const LoginButtonList = () => {
  return (
    <div className="flex flex-col gap-4">
      <LoginButton platform="google" />
      <LoginButton platform="naver" />
      <LoginButton platform="kakao" />
    </div>
  );
};

export default LoginButtonList;
