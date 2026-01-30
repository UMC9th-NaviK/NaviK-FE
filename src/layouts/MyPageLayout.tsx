import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';

export default function MyPageLayout() {
  return (
    <div className="bg-white-background flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
