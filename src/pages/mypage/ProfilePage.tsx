import { useState, useEffect } from 'react';
import ProfileHeader from '../../components/myPage/ProfileHeader';
import RecommendationList from '../../components/myPage/RecommendationList';
import { FOOTERPB } from '../../components/common/Footer';
import { getUserProfile } from '../../apis/user';
import { getRecruitments } from '../../apis/recruit';
import { type RoleType, convertJobToRole } from '../../components/myPage/profiledata';
import type { Recruitment } from '../../types/recruits';
import type { UserProfile } from '../../types/user';

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const [role, setRole] = useState<RoleType>('FE');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, recruitData] = await Promise.all([getUserProfile(), getRecruitments()]);

        setProfile(profileData);
        setRecruitments(recruitData);
        setRole(convertJobToRole(profileData.job));
      } catch (error) {
        console.error('데이터 로딩 중 에러 발생', error);
      }
    };

    fetchData();
  }, []);

  if (!profile) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <div className={`flex w-full flex-col ${FOOTERPB}`}>
      <ProfileHeader role={role} profile={profile} />
      <RecommendationList recruitments={recruitments} />
    </div>
  );
};

export default ProfilePage;
