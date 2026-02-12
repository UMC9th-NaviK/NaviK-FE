import { useState } from 'react';
import { patchUserProfile } from '../../apis/user';
import { REVERSE_EDUCATION_MAP, DEPARTMENT_MAP } from '../../constants/filterMapper';
import ActivitySection from './ActivitySection';
import { EducationSection } from './EducationSection';
import JobSection from './JobSection';
import type { UserProfile, UpdateProfileRequest } from '../../types/user'; // UpdateProfileRequest 추가
import axios from 'axios';

const EditProfileForm = ({ profile }: { profile: UserProfile }) => {
  const [formData, setFormData] = useState({
    nickname: profile.nickname,
    isEntryLevel: profile.isEntryLevel,
    educationLevel: profile.educationLevel || '',
    departmentIds: profile.departmentList || [],
  });

  const handleSave = async () => {
    try {
      const requestBody: UpdateProfileRequest = {
        nickname: formData.nickname,
        isEntryLevel: formData.isEntryLevel,
        educationLevel: formData.educationLevel,
        departmentIds: formData.departmentIds,
      };

      const res = await patchUserProfile(requestBody);
      if (res.isSuccess) {
        alert(' 수정 성공!');
      }
    } catch (error) {
      alert('수정 실패 ');
      if (axios.isAxiosError(error)) {
        console.error('에러 상세:', error.response?.data || error.message);
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

              educationLevel: REVERSE_EDUCATION_MAP[eduName] || '',
              departmentIds: majorNames.map((name) => String(DEPARTMENT_MAP[name] || '')),
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

export default EditProfileForm;
