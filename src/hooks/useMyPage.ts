import { useState, useEffect } from 'react';
import { getUserMyPage } from '../apis/user'; // 마이페이지 전용 API
import { EDUCATION_MAP, DEPARTMENT_NAME_MAP } from '../constants/filterMapper';
import { type RoleType, convertJobToRole } from '../components/myPage/profiledata';
import type { ResponseUserInfo } from '../types/user'; // 상세 정보 타입 사용

export const useMyPage = () => {
  const [profile, setProfile] = useState<ResponseUserInfo | null>(null);
  const [role, setRole] = useState<RoleType>('FE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserMyPage();
        setProfile(data);

        if (data.job) {
          setRole(convertJobToRole(data.job));
        }
      } catch (error) {
        console.error('내 마이페이지 로드 에러:', error);
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
    role,
    isLoading,
    formattedEdu,
    formattedDepts,
  };
};
