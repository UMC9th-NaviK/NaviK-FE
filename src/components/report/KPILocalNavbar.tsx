import { useLocation, useNavigate } from 'react-router-dom';

const KPILocalNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex w-full bg-white pt-[4px] pr-[16px] pl-[16px]">
      <div className="flex flex-1 items-center justify-center">
        <button
          className={`flex-1 pt-[10px] pr-[10px] pb-[15px] pl-[10px] ${isActive('/report/myCard') ? 'text-body-16B text-[#4E83F9] shadow-[inset_0_-3px_0_0_#4E83F9]' : 'text-body-16M text-[#11111199]'}`}
          onClick={() => navigate('/report/myCard')}
        >
          전체 KPI 카드
        </button>

        <button
          className={`flex-1 pt-[10px] pr-[10px] pb-[15px] pl-[10px] ${isActive('/report/core') ? 'text-body-16B text-[#4E83F9] shadow-[inset_0_-3px_0_0_#4E83F9]' : 'text-body-16M text-[#11111199]'}`}
          onClick={() => navigate('/report/core')}
        >
          핵심 역량
        </button>

        <button
          className={`flex-1 pt-[10px] pr-[10px] pb-[15px] pl-[10px] ${isActive('/report/overcoming') ? 'text-body-16B text-[#4E83F9] shadow-[inset_0_-3px_0_0_#4E83F9]' : 'text-body-16M text-[#11111199]'}`}
          onClick={() => navigate('/report/overcoming')}
        >
          극복 역량
        </button>
      </div>
    </div>
  );
};

export default KPILocalNavbar;
