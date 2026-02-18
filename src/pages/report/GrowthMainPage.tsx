import { useNavigate } from 'react-router-dom';
import { ROLE_THEME_MAP } from '../../constants/roleTheme';
import { ROLE_MAP } from '../../types/role';
import LevelCard from '../../components/growth/LevelCard';
import GrowthRecordInput from '../../components/growth/GrowthRecordInput';
import GrowthTimeline from '../../components/growth/GrowthTimeline';
import { getUserProfile } from '../../apis/user';
import { useState, useEffect } from 'react';
import kroman from 'kroman';
import ProfileIcon from '../../assets/images/profile.png';

const GrowthMainPage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    id: 0,
    name: '',
    job: 'pm',
    profileImage: '/icons/reports/logo.svg',
    englishName: '',
  });

  const theme = ROLE_THEME_MAP[profile.job] || ROLE_THEME_MAP['pm'];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();

        const role = ROLE_MAP[response.job] || 'pm';

        const romanized = kroman.parse(response.nickname);
        const englishName = romanized.replace(/-/g, '').replace(/\s+/g, '').toLowerCase();

        setProfile({
          id: response.id,
          name: response.nickname,
          job: role,
          profileImage: response.profileImageUrl,
          englishName: englishName,
        });
      } catch (error) {
        console.log('사용자 찾을 수 없음');
      }
    };

    fetchUserProfile();
  }, []);

  const roleMapping: Record<string, string> = {
    pm: 'PRODUCT MANAGER',
    designer: 'PRODUCT DESIGNER',
    frontend: 'FRONTEND DEVELOPER',
    backend: 'BACKEND DEVELOPER',
  };

  return (
    <div className={`bg-[#4E83F9]`}>
      <div className="relative z-0 h-[150px] w-full bg-linear-to-b from-[#FFFFFF] to-[#4E83F9]">
        <nav className="relative flex items-center gap-[10px] p-[24px]">
          <div className="flex flex-1 justify-between">
            <button>
              <img
                src="/icons/reports/prevButton.svg"
                alt="뒤로가기 버튼"
                className="h-[24px] w-[24px]"
                onClick={() => navigate(-1)}
              />
            </button>
            <h1 className="text-heading-20B"> {'Growth Log'} </h1>
            <div className="h-[24px] w-[24px] border-white"> </div>
          </div>
        </nav>

        <img
          src="/images/growth/logo.png"
          alt="나빅 로고"
          className="absolute top-[-25px] right-[0px] h-[252px] w-[257px] p-[10px]"
        />
      </div>

      <div className="bg-gray-background relative z-20 -mt-[0px] h-full min-h-screen rounded-t-[30px] pb-[84px] shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="relative z-20 flex w-full flex-1 -translate-y-[45%] justify-between gap-[20px] px-[26px] py-[10px]">
          <div
            className={`flex h-[115px] w-[115px] items-center justify-center rounded-full`}
            style={{ background: `var(--role-${profile.job}-secondary)` }}
          >
            <img
              src={`${profile.profileImage || ProfileIcon}`}
              alt="프로필 이미지"
              className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white"
            />
          </div>
          <div className={`mb-[10px] flex items-end justify-end`}>
            <span
              className={`bg-base-100 border border-1 px-[16px] py-[8px] ${theme.surfaceBorder} text-body-eng-14SB rounded-[50px] ${theme.primaryText}`}
            >
              {' '}
              {roleMapping[profile.job]}{' '}
            </span>
          </div>
        </div>

        <div className="-mt-[65px] flex flex-1 items-center justify-between px-[24px] pt-[10px] pb-[10px]">
          <div className="flex flex-1 items-center gap-[9px]">
            <p className="text-heading-20B text-black-900"> {profile.name} </p>
            <p className="text-body-eng-16SB text-[#11111199]"> {profile.englishName} </p>
          </div>
          <button onClick={() => navigate('/mypage')}>
            <img src="/icons/reports/material-symbols_settings-rounded.svg" alt="톱니바퀴" />
          </button>
        </div>

        <div className="flex flex-col gap-[24px] px-[16px] pb-[16px]">
          <LevelCard role={profile.job} />
          <GrowthRecordInput />
          <GrowthTimeline />
        </div>
      </div>
    </div>
  );
};

export default GrowthMainPage;
