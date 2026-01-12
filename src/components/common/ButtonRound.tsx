type ButtonProps = {
  onClick: () => void;
  text: string;
};

const ButtonRound = ({ onClick, text }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary-blue-500 text-body-16B text-base-100 mx-4 w-full cursor-pointer rounded-full py-3"
    >
      {text}
    </button>
  );
};

export default ButtonRound;
