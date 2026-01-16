import { Icon } from '@iconify/react';
import bedgeImg from '../../../images/mypage/bedgeImg.svg';
import { type RoleType, bgStyles, roleImages } from '../myPage/profiledata';

interface HeaderProps {
  role: RoleType;
}

const ProfileHeader = ({ role }: HeaderProps) => {
  return (
    <div
      className={`relative flex flex-1 flex-col gap-3 px-5 transition-all duration-500 ${bgStyles[role]}`}
    >
      <div className="relative z-10 flex w-full items-center justify-between p-5">
        <div className="text-2xl font-bold text-white">마이페이지</div>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/20">
          <Icon icon="material-symbols:settings-rounded" className="h-6 w-6 text-white" />
        </div>
      </div>

      <img
        src={roleImages[role]}
        className="pointer-events-none absolute -bottom-18 left-30 h-auto w-80 opacity-30 transition-opacity duration-500"
        alt="background character"
      />

      <div className="relative z-10 flex items-center gap-5 pt-3">
        <div className="relative h-20 w-20">
          <div className="h-full w-full rounded-full bg-white opacity-20"></div>
          <div className="absolute right-0 bottom-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#E3E3E3]">
            <Icon icon="material-symbols:edit-outline" className="h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-white">응애개발자</div>
          <div className="text-lg text-[#DED6FF]">
            {role === 'PM' && '프로덕트 매니저'}
            {role === 'DESIGNER' && '프로덕트 디자이너'}
            {role === 'FE' && '프론트엔드 개발자'}
            {role === 'BE' && '백엔드 개발자'} | 신입
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-10 w-90 items-center justify-center gap-5 self-center rounded-3xl bg-white/30 px-5">
        <span className="text-14 font-semibold tracking-wider text-white uppercase">
          {role === 'PM' && 'PRODUCT MANAGER'}
          {role === 'DESIGNER' && 'PRODUCT DESIGNER'}
          {role === 'FE' && 'FRONTEND DEVELOPER'}
          {role === 'BE' && 'BACKEND DEVELOPER'}
        </span>
      </div>

      <div className="absolute bottom-0 left-1/2 z-20 flex h-16 w-90 -translate-x-1/2 translate-y-1/2 flex-col justify-center overflow-hidden rounded-xl border border-[#BDADFF] bg-white px-4 text-black shadow-lg backdrop-blur-md">
        <img
          src={bedgeImg}
          className="pointer-events-none absolute top-1/2 right-2 h-24 w-24 -translate-y-1/2"
          alt="background badge"
        />

        <div className="relative z-10 pl-3">
          <div className="text-Opacity/Black80 text-12">항해자님에 대해 더 알려주세요!</div>
          <div className="text-Opacity/Black80 text-12">
            걸어오신 길을 토대로 꿈을 펼칠 수 있는 공고를 추천해드릴게요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
