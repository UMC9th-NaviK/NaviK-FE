import { useNavigate } from 'react-router-dom';

const CardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex w-full items-center justify-between px-6 pt-6 pb-4">
      <p className="text-heading-20B text-base-900">KPI 진단 결과</p>
      <button>
        <img src="/icons/reports/info.svg" className="h-6 w-6" />
      </button>
    </div>
  );
};

export default CardHeader;
