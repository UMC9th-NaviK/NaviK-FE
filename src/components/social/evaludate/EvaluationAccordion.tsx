import { Icon } from '@iconify/react';
import { useState } from 'react';

// 1. 카테고리 데이터의 타입 정의
interface CategoryType {
  id: string;
  icon: string;
  label: string;
  items: string[];
}

// 2. 컴포넌트 Props 타입 정의
interface EvaluationAccordionProps {
  category: CategoryType;
  selectedItems: string[];
  onToggleItem: (item: string) => void; // string을 받아서 아무것도 반환하지 않는 함수라는 뜻!
}

export const EvaluationAccordion = ({
  category,
  selectedItems,
  onToggleItem,
}: EvaluationAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      {/* 아코디언 헤더 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${isOpen ? 'border-primary-blue-500 bg-blue-50/30' : 'border-base-200 bg-white'}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{category.icon}</span>
          <span className="text-body-16B text-base-900">{category.label}</span>
        </div>

        {/* 알려준 아이콘 적용 및 회전 애니메이션 */}
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : '-rotate-90'}`}>
          <Icon
            icon="material-symbols:arrow-back-2-rounded"
            className={`text-2xl ${isOpen ? 'text-primary-blue-500' : 'text-base-400'}`}
          />
        </div>
      </div>

      {/* 아코디언 내용 (리스트) */}
      {isOpen && (
        <div className="mt-2 flex flex-col gap-2 px-1">
          {category.items.map((item) => {
            const isSelected = selectedItems.includes(item);
            return (
              <div
                key={item}
                onClick={() => onToggleItem(item)}
                className={`text-body-14M cursor-pointer rounded-xl p-4 transition-all ${
                  isSelected
                    ? 'bg-primary-blue-100 text-primary-blue-600 font-bold'
                    : 'text-base-600 hover:bg-base-50 bg-white'
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
