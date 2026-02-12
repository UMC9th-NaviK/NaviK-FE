interface SelectGroupProps {
  label: string;
  items: string[];
  selectedItems: string | string[];
  onItemClick: (val: string) => void;
}

export const SelectGroup = ({ label, items, selectedItems, onItemClick }: SelectGroupProps) => {
  // 중복 선택인지 확인하는 헬퍼 함수
  const isSelected = (item: string) =>
    Array.isArray(selectedItems) ? selectedItems.includes(item) : selectedItems === item;

  return (
    <div className="flex gap-3">
      <span className="text-primary-blue-500 text-body-16B shrink-0 pt-1">{label}</span>
      <div className="flex w-70.75 flex-wrap justify-end gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onItemClick(item)}
            className={`text-body-14M rounded-lg border px-2 py-1.5 transition-all ${
              isSelected(item)
                ? 'bg-primary-blue-100 border-primary-blue-200 text-primary-blue-900'
                : 'border-base-200 text-opacity-black-60 bg-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
