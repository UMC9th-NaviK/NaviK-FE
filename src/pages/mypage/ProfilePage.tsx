import { useState } from 'react';
import ProfileHeader from '../../components/myPage/ProfileHeader';
import type { RoleType } from '../../components/myPage/profiledata';
import RecommendationList from '../../components/myPage/RecommendationList';
import { FOOTERPB } from '../../components/common/Footer';

const ProfilePage = () => {
  const [role] = useState<RoleType>('FE');

  return (
    <div className={`flex w-full flex-col ${FOOTERPB}`}>
      <ProfileHeader role={role} />
      <RecommendationList />
    </div>
  );
};

export default ProfilePage;
