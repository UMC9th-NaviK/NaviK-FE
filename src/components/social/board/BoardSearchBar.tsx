import SearchIcon from '../../../assets/social/material-symbols_search-rounded.svg';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onEnter: (value: string) => void;
  placeholder?: string;
};

export default function BoardSearchBar({ value, onChange, onEnter, placeholder = '검색' }: Props) {
  return (
    <div className="border-primary-blue-100 bg-base-100 mt-4 flex w-full flex-col items-center justify-center gap-2.5 self-stretch rounded-[20px] border px-4 py-[10px]">
      <div className="flex w-full items-center justify-between gap-2.5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onEnter(value);
            }
          }}
          placeholder={placeholder}
          className="text-body-14R text-opacity-black-40 placeholder:text-opacity-black-40 w-full bg-transparent outline-none"
        />

        <button
          type="button"
          onClick={() => onEnter(value)}
          className="shrink-0 cursor-pointer"
          aria-label="검색"
        >
          <img src={SearchIcon} alt="" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
