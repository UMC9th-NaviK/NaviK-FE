import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

interface SubHeaderProps {
  title: string;
  bgColor?: string;
}

const SubHeader = ({ title, bgColor = 'bg-[#F5F9FF]' }: SubHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={`w-full ${bgColor} h-18`}>
      <div className="relative flex h-18 w-full items-center justify-between px-4">
        <button
          onClick={() => navigate(-1)}
          className="transition-active flex h-10 w-10 items-center justify-center"
        >
          <Icon
            icon="material-symbols:arrow-back-ios-new-rounded"
            className="text-base-500 h-6 w-6"
          />
        </button>

        <h1 className="text-base-900 text-heading-20B">{title}</h1>

        <div className="w-10" />
      </div>
    </div>
  );
};

export default SubHeader;
