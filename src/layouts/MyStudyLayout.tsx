import { Outlet } from 'react-router-dom';
import MyStudyTabBar from '../components/social/MyStudyTabBar';

export default function MyStudyLayout() {
  return (
    <div>
      <MyStudyTabBar />
      <Outlet />
    </div>
  );
}
