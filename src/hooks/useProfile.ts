import { useState, useEffect } from 'react';
import { getUserProfile } from '../apis/user';
import { type RoleType, convertJobToRole } from '../components/myPage/profiledata';
import type { UserProfile } from '../types/user';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<RoleType>('FE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
        setRole(convertJobToRole(data.job));
      } catch (error) {
        console.error('프로필 로딩 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, role, isLoading };
};
