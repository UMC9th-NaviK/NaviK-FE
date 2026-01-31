import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';

export default function MyPageLayout() {
  return (
    <div className="bg-white-background relative flex min-h-screen w-full flex-col overflow-hidden">
      <main className={`scrollbar-hide flex-1 overflow-y-auto`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
