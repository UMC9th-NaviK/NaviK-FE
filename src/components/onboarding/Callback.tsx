import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../../apis/auth';
import { redirectByUserStatus } from '../../utils/authRedirect';
import { convertJobToShortCode, useUserStore } from '../../store/useUserStore';
import { getUserInfo } from '../../apis/user';

const OAuthCallbackContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      console.log('=== OAuth Callback Started ===');

      try {
        // accessToken과 status 발급
        const { accessToken, status } = await refreshAccessToken();

        // accessToken 저장
        localStorage.setItem('accessToken', accessToken);
        console.log('✅ Access token saved');

        // 온보딩 완료된 사용자만 프로필 조회
        if (status === 'ACTIVE') {
          try {
            const profile = await getUserInfo();
            useUserStore.getState().setUser({
              name: profile.name,
              userId: profile.id,
              nickname: profile.nickname,
              job: convertJobToShortCode(profile.job),
            });
            console.log('✅ User profile loaded');
          } catch (profileError) {
            console.warn('⚠️ Failed to load profile, but continuing...', profileError);
          }
        } else {
          console.log('⏭️ Skipping profile fetch for non-active user');
        }

        // 사용자 상태에 따라 분기
        redirectByUserStatus(status, navigate);
      } catch (error) {
        console.error('❌ OAuth login failed:', error);
        navigate('/login', { replace: true });
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary-blue-500 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    </div>
  );
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
