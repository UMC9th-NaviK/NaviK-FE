import { Icon } from '@iconify/react';
import bedgeImg from '../../assets/images/mypage/bedgeImg.svg';
import ProfileIcon from '../../assets/images/profile.png';
import { type RoleType, bgStyles, borderStyles, roleImages } from '../myPage/profiledata';
import { Link } from 'react-router-dom';
import type { ResponseUserInfo } from '../../types/user';

interface HeaderProps {
  role: RoleType;
  profile: ResponseUserInfo;
}

const ProfileHeader = ({ role, profile }: HeaderProps) => {
  return (
    <div className="relative w-full">
      <div
        className={`relative flex h-64.25 w-full flex-col gap-6 overflow-hidden px-5 ${bgStyles[role]}`}
      >
        {/* 마이페이지 & 설정 아이콘 */}
        <div className="relative z-10 flex w-full items-center justify-between pt-5 pb-1">
          <div className="text-2xl font-bold text-white">마이페이지</div>
          <Link
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/20"
            to={'/mypage/setting'}
          >
            <Icon icon="material-symbols:settings-rounded" className="h-6 w-6 text-white" />
          </Link>
        </div>

        <img
          src={roleImages[role]}
          className="pointer-events-none absolute -bottom-18 left-30 h-auto w-80 opacity-30 transition-opacity duration-500"
          alt="background character"
        />

        {/* 유저 정보 섹션 */}
        <div className="relative z-10 flex h-16 items-center gap-5 pt-3">
          <Link className="relative h-20 w-20" to={'/mypage/edit'}>
            <img
              src={profile.profileImageUrl || ProfileIcon}
              className="h-full w-full rounded-full bg-cover bg-center"
            />
            <div className="bg-base-200 absolute right-0 bottom-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full">
              <Icon icon="material-symbols:edit-outline" className="h-5 w-5" />
            </div>
          </Link>
          <div className="flex flex-col">
            <div className="text-heading-18B text-white">{profile.nickname || profile.name}</div>
            <div className="text-body-16M text-[#DED6FF]">
              {profile.job} | {profile.isEntryLevel ? '신입' : '경력'}
            </div>
          </div>
        </div>

        {/* 직무 영문 표시 섹션 */}
        <div className="relative z-10 mx-5.5 flex h-10 w-full items-center justify-center gap-5 self-center rounded-3xl bg-white/30 px-5">
          <span className="text-body-eng-14SB tracking-wider text-white uppercase">
            {role === 'PM' && 'PRODUCT MANAGER'}
            {role === 'DESIGNER' && 'PRODUCT DESIGNER'}
            {role === 'FE' && 'FRONTEND DEVELOPER'}
            {role === 'BE' && 'BACKEND DEVELOPER'}
          </span>
        </div>
      </div>

      <div
        className={`absolute inset-x-4 bottom-0 z-20 flex h-16 translate-y-1/2 flex-col justify-center overflow-hidden rounded-xl border ${borderStyles[role]} bg-white px-4 text-black shadow-lg backdrop-blur-md`}
      >
        <img
          src={bedgeImg}
          className="pointer-events-none absolute top-1/2 right-0 h-24 w-24 -translate-y-1/2"
          alt="background badge"
        />
        <div className="relative z-10 pl-3">
          <div className="text-opacity-black-80 text-caption-12M">
            항해자님에 대해 더 알려주세요!
          </div>
          <div className="text-opacity-black-80 text-caption-12M">
            걸어오신 길을 토대로 꿈을 펼칠 수 있는 공고를 추천해드릴게요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
