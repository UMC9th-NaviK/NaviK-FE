import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';

export default function ReportLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
