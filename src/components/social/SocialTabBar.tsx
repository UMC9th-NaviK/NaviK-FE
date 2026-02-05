import { useLocation, useNavigate } from 'react-router-dom';
import SocialTabButton from '../social/SocialTabButton';

type SocialTab = '스터디' | '게시판' | '내 평가';

const TAB_CONFIG: {
  label: SocialTab;
  path: string;
}[] = [
  { label: '스터디', path: '/social/study' },
  { label: '게시판', path: '/social/board' },
  { label: '내 평가', path: '/social/evaluation' },
];

export default function SocialTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-white-background mt-4 flex h-[53px] shrink-0 items-center justify-center gap-2.5 rounded-[8px] p-2">
      {TAB_CONFIG.map(({ label, path }) => {
        const active = location.pathname.startsWith(path);
        return (
          <SocialTabButton
            key={path}
            label={label}
            active={active}
            onClick={() => navigate(path)}
          />
        );
      })}
    </div>
  );
}
