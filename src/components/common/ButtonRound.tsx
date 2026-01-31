type ButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  color?: 'white';
};

const ButtonRound = ({ onClick, text, disabled, color }: ButtonProps) => {
  const isWhite = color === 'white';
  const baseClass =
    `${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'} ` +
    (isWhite
      ? 'border border-primary-blue-500 bg-base-100 text-primary-blue-500 '
      : 'bg-primary-blue-500 text-base-100 ') +
    'text-body-16B w-full rounded-full py-3';
  return (
    <button onClick={onClick} disabled={disabled} className={baseClass}>
      {text}
    </button>
  );
};

export default ButtonRound;
