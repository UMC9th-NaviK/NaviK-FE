import { useState, useEffect } from 'react';
import { getUserMyPage } from '../apis/user';
import { EDUCATION_MAP, DEPARTMENT_NAME_MAP } from '../constants/filterMapper';
import type { UserProfile } from '../types/user';

export const useMyPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserMyPage();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.error('내 프로필 로드 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formattedEdu = profile ? EDUCATION_MAP[profile.educationLevel] || '정보 없음' : '';

  const formattedDepts = profile?.departmentList
    ? profile.departmentList.map((id) => DEPARTMENT_NAME_MAP[Number(id)] || '기타').join(', ')
    : '';

  return {
    profile,
    isLoading,
    formattedEdu, // '4년제 대학교'
    formattedDepts, // 'IT, 공학'
  };
};
