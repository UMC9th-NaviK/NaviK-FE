import { Icon } from '@iconify/react';
import { useState } from 'react';

export interface EvaluationItem {
  id: string;
  icon: string;
  label: string;
  items: string[];
}

interface EvaluationAccordionProps {
  category: EvaluationItem;
  selectedItems: string[];
  onToggleItem: (item: string) => void;
  errorItem: string | null;
}

export const EvaluationAccordion = ({
  category,
  selectedItems,
  onToggleItem,
  errorItem,
}: EvaluationAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isAnyItemSelected = category.items.some((item) => selectedItems.includes(item));

  return (
    <div className="flex w-full flex-col">
      {/* 아코디언 헤더 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`text-body-14B flex h-10 cursor-pointer items-center justify-between rounded-lg border p-4 transition-all duration-300 ${
          isOpen || isAnyItemSelected
            ? 'border-primary-blue-200 bg-primary-blue-100/30 text-primary-blue-500'
            : 'border-base-200 text-base-900 bg-white'
        }`}
      >
        <div className="flex items-center gap-2">
          <span>{category.icon}</span>
          <span className={isAnyItemSelected ? 'font-bold' : ''}>{category.label}</span>
        </div>

        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : '-rotate-90'}`}>
          <Icon
            icon="material-symbols:arrow-back-2-rounded"
            className={`text-2xl ${
              isOpen || isAnyItemSelected ? 'text-primary-blue-500' : 'text-base-300'
            }`}
          />
        </div>
      </div>

      {/* 아코디언 내용 */}
      {isOpen && (
        <div className="animate-fadeIn flex flex-col gap-1 px-2 py-2">
          {category.items.map((item) => {
            const isSelected = selectedItems.includes(item);
            const isError = errorItem === item;

            return (
              <div
                key={item}
                onClick={() => onToggleItem(item)}
                className={`text-caption-12M flex h-8 cursor-pointer items-center rounded-lg px-2 py-1 transition-all ${
                  isError
                    ? 'animate-shake border border-[#E72326] text-[#E72326]'
                    : isSelected
                      ? 'bg-primary-blue-100 text-primary-blue-500 text-caption-12B'
                      : 'text-opacity-black-80 hover:bg-base-50 border border-transparent bg-white'
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
