const NAVS = ['전체 KPI 카드', '핵심 역량', '극복 역량'];

interface CardNavigateProps {
  selected: number;
  setSelected: (idx: number) => void;
}

const CardNavigate = ({ selected, setSelected }: CardNavigateProps) => {
  return (
    <nav className="flex px-4 pt-1">
      {NAVS.map((label, idx) => (
        <button
          key={label}
          className={`flex-1 cursor-pointer pb-3.75 transition-all ${
            selected === idx
              ? 'text-body-16B text-primary-blue-500 border-primary-blue-500 border-b-[3px]'
              : 'text-body-16M text-opacity-black-60 border-b-[3px] border-transparent'
          }`}
          onClick={() => setSelected(idx)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
};

export default CardNavigate;
