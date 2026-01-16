import { useNavigate } from 'react-router-dom';

type BackHeaderProps = {
  title?: string;
};

const BackHeader = ({ title }: BackHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex w-full items-center p-6">
      <button
        className="absolute top-1/2 left-6 -translate-y-1/2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src="/icons/arrow-back.svg" className="h-6 w-6" alt="Back" />
      </button>
      <p className="text-heading-20B w-full text-center">{title}</p>
    </div>
  );
};

export default BackHeader;
