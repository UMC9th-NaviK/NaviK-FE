import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/common/Footer';

export default function MyPageLayout() {
  const { pathname } = useLocation();

  const shouldHideFooter = pathname.includes('recommend');

  return (
    <div className="bg-white-background flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}
