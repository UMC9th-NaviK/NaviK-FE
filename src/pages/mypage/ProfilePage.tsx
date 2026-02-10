import { Icon } from '@iconify/react';
import ProfileHeader from '../../components/myPage/ProfileHeader';
import RecommendationList from '../../components/myPage/RecommendationList';
import { FOOTERPB } from '../../components/common/Footer';
import { useProfile } from '../../hooks/useProfile';
import { useRecruitments } from '../../hooks/useRecruitments';

const ProfilePage = () => {
  const { profile, role, isLoading: isProfileLoading } = useProfile();
  const { recruitments, isLoading: isRecruitLoading } = useRecruitments();

  if (isProfileLoading || isRecruitLoading) {
    return (
      <div className={`flex min-h-screen w-full flex-col items-center justify-center ${FOOTERPB}`}>
        <Icon
          icon="line-md:loading-twotone-loop"
          style={{ width: '80px', height: '80px' }}
          className="text-primary-blue-500"
        />
        <p className="text-body-16SB text-opacity-black-60 mt-4">프로필 정보를 불러오고 있어요</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className={`flex w-full flex-col ${FOOTERPB}`}>
      <ProfileHeader role={role} profile={profile} />
      <RecommendationList recruitments={recruitments} />
    </div>
  );
};

export default ProfilePage;
