import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/notice');
  };
  return (
    <div className="flex items-center justify-between p-4">
      <img src="/icons/reports/logo-white.svg" alt="Logo" className="w-28.5" />
      <button onClick={onClick} className="cursor-pointer">
        <img src="/icons/reports/notice.svg" alt="Notice" className="h-8 w-8" />
      </button>
    </div>
  );
};

export default HomeHeader;
