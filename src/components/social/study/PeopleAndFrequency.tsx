type Props = {
  peopleLabels: readonly string[];
  activePeopleIndex: number | null;
  onChangePeopleIndex: (idx: number) => void;

  count: number;
  onDecrease: () => void;
  onIncrease: () => void;

  MinusIcon: string;
  MinusIcon2: string;
  PlusIcon: string;
  PlusIcon2: string;
};

export default function PeopleAndFrequency({
  peopleLabels,
  activePeopleIndex,
  onChangePeopleIndex,
  count,
  onDecrease,
  onIncrease,
  MinusIcon,
  MinusIcon2,
  PlusIcon,
  PlusIcon2,
}: Props) {
  return (
    <>
      <div className="mt-6 flex w-full items-center justify-between">
        <span className="text-body-14B text-[#111111]">몇 명이서 모일까요?</span>
        <div className="flex shrink-0 items-center gap-[8px]">
          {peopleLabels.map((label, index) => {
            const isActive = activePeopleIndex === index;

            return (
              <button
                key={label}
                type="button"
                onClick={() => onChangePeopleIndex(index)}
                className={`flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] border px-[8px] py-[2px] transition-colors ${
                  isActive
                    ? 'text-primary-blue-900 border-[#B8D4FE] bg-[#B8D4FE]'
                    : 'text-opacity-black-60 border-[#B8D4FE] bg-white'
                }`}
              >
                <span className="text-body-14M">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex w-full items-center justify-between">
        <span className="text-body-14B text-[#111111]">얼마나 자주 모일까요?</span>
        <span className="text-body-14M text-opacity-black-80">1주일에 </span>

        <button
          type="button"
          onClick={onDecrease}
          disabled={count === 1}
          className={count === 1 ? 'cursor-not-allowed' : ''}
        >
          <img src={count === 1 ? MinusIcon : MinusIcon2} alt="minus" className="h-6 w-6" />
        </button>

        <span className="text-body-14B min-w-[12px] text-center">{count}</span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={count === 7}
          className={count === 7 ? 'cursor-not-allowed' : ''}
        >
          <img src={count === 7 ? PlusIcon2 : PlusIcon} alt="plus" className="h-6 w-6" />
        </button>

        <span className="text-body-14M text-opacity-black-80">회</span>
      </div>
    </>
  );
}
