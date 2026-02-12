import SubHeader from '../../components/myPage/SubHeader';
import { FOOTERPB } from '../../components/common/Footer';
import { useMyPage } from '../../hooks/useMyPage';
import EditProfileForm from '../../components/myPage/EditProfileForm';

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
