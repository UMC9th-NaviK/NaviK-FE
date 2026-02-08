import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axios';
import type { CommonResponse } from '../../types/common';

const OAuthCallbackContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log('=== OAuth Callback Started ===');

      try {
        // refresh_token 쿠키로 access_token 발급 요청
        const response = await axiosInstance.post<CommonResponse<string>>('/auth/refresh', null, {
          withCredentials: true,
        });

        console.log('Token Response:', response.data);

        if (!response.data?.isSuccess) {
          throw new Error('Token refresh failed');
        }

        const accessToken = response.data.result;
        localStorage.setItem('accessToken', accessToken);

        // TODO: 가입 여부 확인 후 리다이렉트 경로 설정
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        localStorage.removeItem('redirectAfterLogin');

        console.log('Redirecting to:', redirectPath || '/home');

        navigate(redirectPath || '/home', { replace: true });
      } catch (error) {
        console.error('❌ OAuth login failed:', error);
        navigate('/login', { replace: true });
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return <p>로그인중</p>;
};

const OAuthCallback = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="border-primary-blue-500 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          </div>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
};

export default OAuthCallback;
