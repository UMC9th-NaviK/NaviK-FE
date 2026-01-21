import { useState } from 'react';
import ProfileHeader from '../../components/myPage/ProfileHeader';
import type { RoleType } from '../../components/myPage/profiledata';
import RecommendationList from '../../components/myPage/RecommendationList';

const ProfilePage = () => {
  const [role] = useState<RoleType>('FE');

  return (
    <div className="flex h-screen w-full flex-col">
      <ProfileHeader role={role} />
      <RecommendationList />
    </div>
  );
};

export default ProfilePage;
