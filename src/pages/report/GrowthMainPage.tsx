import { useNavigate } from "react-router-dom";
import { ROLE_THEME_MAP } from "../../constants/roleTheme";
import { ROLE_MAP } from "../../types/role";
import LevelCard from "../../components/growth/LevelCard";
import GrowthRecordInput from "../../components/growth/GrowthRecordInput";
import GrowthTimeline from "../../components/growth/GrowthTimeline";
import { getUserProfile } from "../../apis/user";
import { useState, useEffect } from "react";
import kroman from 'kroman';

const GrowthMainPage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    id: 0,
    name: "",
    job: "pm",
    profileImage: "/icons/reports/logo.svg",
    englishName: ""
  });

  const theme = ROLE_THEME_MAP[profile.job] || ROLE_THEME_MAP['pm'];

  useEffect(() => {
      const fetchUserProfile = async () => {
          try {
              const response = await getUserProfile();

              const role = (ROLE_MAP[response.job] || 'pm');

              const romanized = kroman.parse(response.nickname);
              const englishName = (romanized.replace(/-/g, '').replace(/\s+/g, '').toLowerCase());

              setProfile({
                id: response.id,
                name: response.nickname,
                job: role,
                profileImage: response.profileImageUrl,
                englishName: englishName
            });
          }

          catch (error) {
              console.log("사용자 찾을 수 없음");
          }
      }

      fetchUserProfile();
  }, [])

  const roleMapping : Record<string, string> = {
    "pm": "PRODUCT MANAGER",
    "designer": "PRODUCT DESIGNER",
    "frontend": "FRONTEND DEVELOPER",
    "backend": "BACKEND DEVELOPER"
  };

  return (
    <div className={`bg-[#4E83F9]`}>
      <div className="relative z-0 w-full h-[150px] bg-linear-to-b from-[#FFFFFF] to-[#4E83F9]">
        <nav className='relative flex items-center p-[24px] gap-[10px]'>
          <div className='flex flex-1 justify-between'>
            <button>
              <img 
              src="/icons/reports/prevButton.svg"
              alt="뒤로가기 버튼"
              className='w-[24px] h-[24px]'
              onClick={() => navigate(-1)}
              />
            </button>
            <h1 className='text-heading-20B'> { "Growth Log" } </h1>
            <div className='w-[24px] h-[24px] border-white'>  </div>
          </div>
        </nav>

        <img 
        src="/images/growth/logo.png"
        alt="나빅 로고"
        className="absolute top-[-25px] right-[0px] w-[257px] h-[252px] p-[10px]"
        />
      </div>

      <div className="relative h-full z-20 bg-gray-background pb-[84px] rounded-t-[30px] -mt-[0px] min-h-screen shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="relative -translate-y-[45%] flex flex-1 z-20 w-full py-[10px] px-[26px] gap-[20px] justify-between">
          <div 
          className={`flex items-center justify-center w-[115px] h-[115px] rounded-full`} 
          style={{ background: `var(--role-${profile.job}-secondary)`}} >
            <img 
            src={`${profile.profileImage}`}
            alt="프로필 이미지"
            className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-white" />
          </div>
          <div className={`flex justify-end items-end mb-[10px]`}>
            <span className={`bg-base-100 px-[16px] py-[8px] border border-1 ${theme.surfaceBorder} rounded-[50px] text-body-eng-14SB ${theme.primaryText}`}> {roleMapping[profile.job]} </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between -mt-[65px] pt-[10px] px-[24px] pb-[10px]">
          <div className="flex flex-1 items-center gap-[9px]">
            <p className="text-heading-20B text-black-900"> { profile.name } </p>
            <p className="text-body-eng-16SB text-[#11111199]"> { profile.englishName } </p>
          </div>
          <button
          onClick={() => navigate("/mypage")}>
            <img 
            src="/icons/reports/material-symbols_settings-rounded.svg"
            alt="톱니바퀴"
            />
          </button> 
        </div>

        <div className="flex flex-col px-[16px] pb-[16px] gap-[24px]">
          <LevelCard role={profile.job} />
          <GrowthRecordInput />
          <GrowthTimeline />
        </div> 
      </div>
    </div>
  )
};

export default GrowthMainPage;