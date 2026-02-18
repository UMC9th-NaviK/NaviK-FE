import SubHeader from '../../components/myPage/SubHeader';
import { FOOTERPB } from '../../components/common/Footer';
import { useMyPage } from '../../hooks/useMyPage';
import EditProfileForm from '../../components/myPage/EditProfileForm';
import EditImageSection from '../../components/myPage/EditImageSection';
import ProfileIcon from '../../assets/images/profile.png';

const EditProfilePage = () => {
  const { profile, isLoading } = useMyPage();

  if (isLoading || !profile) return <div>로딩 중...</div>;

  return (
    <div className={`mb-4 flex min-h-screen w-full flex-col items-center`}>
      <SubHeader title="내 정보 수정" />
      <div className="h-20 w-full"></div>

      <div className={`relative flex-1 gap-6 rounded-t-[30px] bg-white px-5 ${FOOTERPB}`}>
        <EditImageSection
          profileId={profile.id}
          imageUrl={profile.profileImageUrl || ProfileIcon}
        />
        <div className="mt-20 flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base-900 text-heading-24B">{profile.name || '사용자'}</span>
            {profile.nickname && (
              <>
                <span className="text-base-900 text-heading-24B text-opacity-40">|</span>
                <span className="text-base-900 text-heading-24B">{profile.nickname}</span>
              </>
            )}
          </div>
        </div>

        <EditProfileForm key={profile.profileImageUrl} profile={profile} />
      </div>
    </div>
  );
};

export default EditProfilePage;
