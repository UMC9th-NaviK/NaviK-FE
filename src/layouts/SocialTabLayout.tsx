import { Outlet } from 'react-router-dom';
import SocialTabBar from '../components/social/SocialTabBar';

export default function SocialTabLayout() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-heading-24B text-base-900 self-stretch">소셜</h1>
      <p className="text-body-14R text-opacity-black-60 mt-1 self-stretch">
        함께 배우고 성장하는 공간이에요
      </p>

      <SocialTabBar />

      <Outlet />
    </div>
  );
}
