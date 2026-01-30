import JobSection from '../../components/myPage/JobSection';
import ActivitySection from '../../components/myPage/ActivitySection';
import SubHeader from '../../components/myPage/SubHeader';
import { EducationSection } from '../../components/myPage/EducationSection';
import { FOOTERPB } from '../../components/common/Footer';

const EditProfilePage = () => {
  return (
    <div className={`mb-4 flex min-h-screen w-full flex-col items-center`}>
      <SubHeader title="내 정보 수정" />
      <div className="h-20 w-full"></div>
      {/*레이아웃 맞추기용*/}
      <div className={`relative flex-1 gap-6 rounded-t-[30px] bg-white px-5 ${FOOTERPB}`}>
        {/* 프로필 이미지 */}
        <div className="border-base-100 absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 overflow-hidden rounded-full border-8 bg-gray-100">
          <img className="h-full w-full" alt="프로필" />
        </div>

        {/* 이름, 직무 */}
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

        <button className="bg-primary-blue-500 text-body-16B text-base-100 h-12 w-85.75 rounded-lg active:brightness-90">
          저장하기
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
