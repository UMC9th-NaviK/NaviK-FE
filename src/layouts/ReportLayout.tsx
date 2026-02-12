import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/common/Footer';

export default function ReportLayout() {
  const { pathname } = useLocation();

  const excludeFooterPaths = ['/report/core/detail', '/report/overcoming/detail'];

  const shouldShowFooter = !excludeFooterPaths.includes(pathname);

  return (
    <>
      <Outlet />

      {shouldShowFooter && <Footer />}
    </>
  );
}
