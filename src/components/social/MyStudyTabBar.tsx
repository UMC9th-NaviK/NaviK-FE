import { NavLink } from 'react-router-dom';

function cn(...arr: (string | false | undefined)[]) {
  return arr.filter(Boolean).join(' ');
}

export default function MyStudyTabBar() {
  const base =
    'flex w-full flex-1 items-center justify-center gap-[10px] px-[45px] pt-[10px] pb-[15px]';
  const textBase = 'whitespace-nowrap text-[16px] font-semibold leading-[140%] tracking-[-0.32px]';

  return (
    <div className="mt-6 flex w-full">
      <NavLink to="/social/study/my/participate" end className="w-1/2">
        {({ isActive }) => (
          <div className={cn(base, isActive && 'border-primary-blue-500 border-b-[3px]')}>
            <span
              className={cn(textBase, isActive ? 'text-primary-blue-500' : 'text-opacity-black-60')}
            >
              참여 중 (스터디원)
            </span>
          </div>
        )}
      </NavLink>

      <NavLink to="/social/study/my/operate" end className="w-1/2">
        {({ isActive }) => (
          <div className={cn(base, isActive && 'border-primary-blue-500 border-b-[3px]')}>
            <span
              className={cn(textBase, isActive ? 'text-primary-blue-500' : 'text-opacity-black-60')}
            >
              운영 중 (리더)
            </span>
          </div>
        )}
      </NavLink>
    </div>
  );
}
