import { Icon } from '@iconify/react';
import type { FilterItem } from './filterData';

interface FilterBarProps {
  filters: FilterItem[];
  selectedValues: Record<string, string>;
  activeFilter: string | null;
  onFilterClick: (label: string) => void;
  onResetAll: () => void;
}

export const FilterBar = ({
  filters,
  selectedValues,
  activeFilter,
  onFilterClick,
  onResetAll,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col px-4">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto">
        {filters.map((filter) => {
          const isSelected = !!selectedValues[filter.label];
          const isActive = activeFilter === filter.label;

          return (
            <button
              key={filter.id}
              onClick={() => onFilterClick(filter.label)}
              className={`text-caption-12R flex h-6.25 shrink-0 items-center justify-center gap-0.5 rounded-full border px-3 transition-all ${
                isActive || isSelected
                  ? 'border-primary-blue-200 bg-primary-blue-100 text-primary-blue-900'
                  : 'border-base-200 text-opacity-black-60 bg-white'
              }`}
            >
              <span>{selectedValues[filter.label] || filter.label}</span>
              <Icon
                icon="material-symbols:arrow-back-2-rounded"
                className={`text-10 -rotate-90 transition-transform ${isActive ? 'rotate-90' : ''}`}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-2">
        <button
          onClick={onResetAll}
          className="text-opacity-black-60 flex items-center gap-1 transition-all"
        >
          <Icon icon="material-symbols:change-circle-outline-rounded" />
          <span className="border-opacity-black-40 text-caption-12R border-b">전체 재설정</span>
        </button>
      </div>
    </div>
  );
};
