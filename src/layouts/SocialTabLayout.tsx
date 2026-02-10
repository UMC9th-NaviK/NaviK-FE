import { Outlet } from 'react-router-dom';
import SocialTabBar from '../components/social/SocialTabBar';

export default function SocialTabLayout() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-linear-to-b from-[#FFFFFF] to-[#F5F8FF]">
      <div
        className="pointer-events-none absolute top-[280px] left-1/2 h-[628px] w-[628px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, #94BBFD 0%, rgba(184, 212, 254, 0) 100%)',
        }}
      />

      <div className="relative z-10 px-5 pt-6">
        <h1 className="text-heading-24B text-base-900 self-stretch">소셜</h1>
        <p className="text-body-14R text-opacity-black-60 mt-1 self-stretch">
          함께 배우고 성장하는 공간이에요
        </p>

        <SocialTabBar />

        <Outlet />
      </div>
    </div>
  );
}
