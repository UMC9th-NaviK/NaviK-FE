type SocialTab = '스터디' | '게시판' | '내 평가';

function cn(...arr: (string | false | undefined)[]) {
  return arr.filter(Boolean).join(' ');
}

interface SocialTabButtonProps {
  label: SocialTab;
  active: boolean;
  onClick: () => void;
}

export default function SocialTabButton({ label, active, onClick }: SocialTabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-full flex-1 cursor-pointer items-center justify-center rounded-[8px] transition',
        active ? 'bg-base-100 shadow-[0_0_10px_0_#DBEBFE]' : 'bg-transparent',
      )}
    >
      <span
        className={cn('text-body-14M', active ? 'text-primary-blue-500' : 'text-opacity-black-40')}
      >
        {label}
      </span>
    </button>
  );
}
