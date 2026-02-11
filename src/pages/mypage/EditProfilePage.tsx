import { useState } from 'react';
import axios from 'axios'; //
import JobSection from '../../components/myPage/JobSection';
import ActivitySection from '../../components/myPage/ActivitySection';
import SubHeader from '../../components/myPage/SubHeader';
import { EducationSection } from '../../components/myPage/EducationSection';
import { FOOTERPB } from '../../components/common/Footer';
import { useMyPage } from '../../hooks/useMyPage';
import { REVERSE_EDUCATION_MAP, DEPARTMENT_MAP } from '../../constants/filterMapper';
import { patchUserProfile } from '../../apis/user';
import type { UserProfile } from '../../types/user';
import { useNavigate } from 'react-router-dom';

const EditProfileForm = ({ profile }: { profile: UserProfile }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: profile.nickname,
    isEntryLevel: profile.isEntryLevel,
    educationLevel: profile.educationLevel,
    departmentIds: profile.departmentList,
  });

  const handleSave = async () => {
    try {
      await patchUserProfile(formData);

      navigate('/mypage');
    } catch (error) {
      alert('수정 실패');
      if (axios.isAxiosError(error)) {
        console.log('에러 발생 당시 데이터:', formData);
        console.log('서버 응답 에러:', error.response?.data || error.message);
      } else {
        console.error('알 수 없는 에러:', error);
      }
    }
  };

  return (
    <>
      <div className="mt-10 flex flex-col items-center gap-6">
        <JobSection
          initialJob={profile.job}
          initialIsEntry={profile.isEntryLevel}
          onDataChange={(isEntry) => setFormData((prev) => ({ ...prev, isEntryLevel: isEntry }))}
        />

        <EducationSection
          initialEdu={profile.educationLevel}
          initialMajors={profile.departmentList}
          onDataChange={(eduName, majorNames) => {
            setFormData((prev) => ({
              ...prev,
              educationLevel: REVERSE_EDUCATION_MAP[eduName],
              departmentIds: majorNames.map((name) => String(DEPARTMENT_MAP[name])),
            }));
          }}
        />

        <ActivitySection />
      </div>

      <button
        onClick={handleSave}
        className="bg-primary-blue-500 text-body-16B text-base-100 mt-10 h-12 w-85.75 rounded-lg active:brightness-90"
      >
        저장하기
      </button>
    </>
  );
};

const EditProfilePage = () => {
  const { profile, isLoading } = useMyPage();

  if (isLoading || !profile) return <div>로딩 중...</div>;

  return (
    <div className={`mb-4 flex min-h-screen w-full flex-col items-center`}>
      <SubHeader title="내 정보 수정" />
      <div className="h-20 w-full"></div>

      <div className={`relative flex-1 gap-6 rounded-t-[30px] bg-white px-5 ${FOOTERPB}`}>
        <div className="border-base-100 absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 overflow-hidden rounded-full border-8 bg-gray-100">
          <img className="h-full w-full object-cover" src={profile.profileImageUrl} alt="프로필" />
        </div>

        <div className="mt-20 flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base-900 text-heading-24B">{profile.name || '사용자'}</span>
            <span className="text-base-900 text-heading-24B text-opacity-40">|</span>
            <span className="text-base-900 text-heading-24B">{profile.nickname}</span>
          </div>
        </div>

        <EditProfileForm profile={profile} />
      </div>
    </div>
  );
};

export default EditProfilePage;
