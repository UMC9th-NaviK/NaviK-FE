import { Outlet } from 'react-router-dom';
import Footer, { FOOTERPB } from '../components/common/Footer';

export default function SocialLayout() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col">
      <main className={`scrollbar-hide flex-1 overflow-y-auto ${FOOTERPB}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
