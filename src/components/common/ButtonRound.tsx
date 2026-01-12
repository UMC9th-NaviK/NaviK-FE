type ButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
};

const ButtonRound = ({ onClick, text, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'} bg-primary-blue-500 text-body-16B text-base-100 w-full rounded-full py-3`}
    >
      {text}
    </button>
  );
};

export default ButtonRound;
