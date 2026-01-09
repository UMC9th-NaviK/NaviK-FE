type BackHeaderProps = {
  title?: string;
};

const BackHeader = ({ title }: BackHeaderProps) => {
  return (
    <div className="relative flex w-full items-center justify-center">
      <button
        className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer"
        onClick={() => window.history.back()}
      >
        <img src="/icons/arrow-back.svg" className="h-6 w-6" alt="Back" />
      </button>
      <p>{title}</p>
    </div>
  );
};

export default BackHeader;
