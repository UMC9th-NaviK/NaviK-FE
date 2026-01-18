type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  text: string;
};

const ButtonSquare = ({ onClick, disabled, text }: ButtonProps) => {
  return (
    <button
      className={`text-base-100 text-body-16B w-full rounded-lg py-3 text-center transition-all ${!disabled ? 'bg-primary-blue-500 cursor-pointer opacity-100' : 'bg-primary-blue-200 cursor-default opacity-50'}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonSquare;
