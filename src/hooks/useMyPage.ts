import { useQuery } from '@tanstack/react-query'; // 추가
import { getUserMyPage } from '../apis/user';
import { EDUCATION_MAP, DEPARTMENT_NAME_MAP } from '../constants/filterMapper';
import { convertJobToRole } from '../components/myPage/profiledata';

export const useMyPage = () => {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['myPage'],
    queryFn: getUserMyPage,
    staleTime: 1000 * 60 * 5,
  });

  const role = profile?.job ? convertJobToRole(profile.job) : 'FE';

  const formattedEdu = profile ? EDUCATION_MAP[profile.educationLevel] || '정보 없음' : '';

  const formattedDepts = profile?.departmentList
    ? profile.departmentList.map((id) => DEPARTMENT_NAME_MAP[Number(id)] || '기타').join(', ')
    : '';

  if (error) {
    console.error('내 마이페이지 로드 에러:', error);
  }

  return {
    profile,
    role,
    isLoading,
    formattedEdu,
    formattedDepts,
  };
};
