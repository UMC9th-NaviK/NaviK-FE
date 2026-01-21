import { Icon } from '@iconify/react';

import { useNavigate } from 'react-router-dom';
import JobSection from '../../components/myPage/JobSection';
import EducationSection from '../../components/myPage/EducationSection';
import ActivitySection from '../../components/myPage/ActivitySection';

const EditProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex min-h-screen w-full flex-col items-center">
      <div className="pb-20">
        {' '}
        {/* 네비게이션 바 */}
        <div className="relative flex h-18 w-full items-center justify-between px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center"
          >
            <Icon
              icon="material-symbols:arrow-back-ios-new-rounded"
              className="text-base-500 h-6 w-6"
            />
          </button>
          <h1 className="text-base-900 text-heading-20B">내 정보 수정</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* 하단 컨텐츠 */}
      <div className="relative flex-1 rounded-t-[30px] bg-white px-5">
        {/* 프로필 이미지!*/}
        <div className="border-base-100 absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 overflow-hidden rounded-full border-8 bg-gray-100">
          {/* 여기에 프로필 이미지 넣을 예정 */}
          <img className="h-full w-full" alt="프로필" />
        </div>

        {/* 이름,직무 */}
        <div className="mt-20 flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base-900 text-heading-24B">김나비</span>
            <span className="text-base-900 text-heading-24B text-opacity-40">|</span>
            <span className="text-base-900 text-heading-24B">응애개발자</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <JobSection />
          <EducationSection />
          <ActivitySection />
        </div>
      </div>
      <button className="bg-primary-blue-500 text-body-16B text-base-100 h-12 w-85.75 rounded-lg">
        저장하기
      </button>
    </div>
  );
};

export default EditProfilePage;
