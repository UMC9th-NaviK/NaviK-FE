import { Outlet } from 'react-router-dom';
import StudySubTabBar from '../components/social/StudySubTabBar';

export default function StudyLayout() {
  return (
    <div className="mt-4">
      <StudySubTabBar />
      <Outlet />
    </div>
  );
}
