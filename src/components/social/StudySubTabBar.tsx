import { NavLink } from 'react-router-dom';

type StudyTab = '맞춤 스터디 추천' | '스터디 만들기' | '마이 스터디';

function cn(...arr: (string | false | undefined)[]) {
  return arr.filter(Boolean).join(' ');
}

function TabChip({
  label,
  active,
  icon,
  iconGapPx,
}: {
  label: StudyTab;
  active: boolean;
  icon?: React.ReactNode;
  iconGapPx?: 4 | 10;
}) {
  const gapClass = icon ? (iconGapPx === 4 ? 'gap-1' : 'gap-2.5') : '';

  return (
    <div
      className={cn(
        'flex shrink-0 cursor-pointer items-center justify-center rounded-full px-3 py-2 transition',
        icon ? 'gap-2.5' : '',
        active
          ? 'bg-primary-blue-500'
          : 'bg-primary-blue-100 border-primary-blue-200 border border-[0.5px]',
      )}
    >
      <span
        className={cn(
          'text-caption-12M inline-flex items-center',
          gapClass,
          active ? 'text-base-100' : 'text-opacity-black-80',
        )}
      >
        {icon}
        {label}
      </span>
    </div>
  );
}

export default function StudySubTabBar() {
  return (
    <div className="-x-auto mt-4 flex w-full items-center gap-1.5 overflow-x-auto pb-1 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <NavLink to="/social/study/recommend" end>
        {({ isActive }) => (
          <TabChip
            label="맞춤 스터디 추천"
            active={isActive}
            icon={<span aria-hidden>🪄</span>}
            iconGapPx={4}
          />
        )}
      </NavLink>

      <NavLink to="/social/study/new" end>
        {({ isActive }) => (
          <TabChip
            label="스터디 만들기"
            active={isActive}
            icon={<span aria-hidden>✏️</span>}
            iconGapPx={4}
          />
        )}
      </NavLink>

      <NavLink to="/social/study/my">
        {({ isActive }) => (
          <TabChip
            label="마이 스터디"
            active={isActive}
            icon={<span aria-hidden>📚</span>}
            iconGapPx={4}
          />
        )}
      </NavLink>
    </div>
  );
}
