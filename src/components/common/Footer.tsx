import { Link, useLocation } from 'react-router-dom';
import DOC from '../../../public/icons/footer/Doc.svg';
import Graph from '../../../public/icons/footer/Graph.svg';
import Chat from '../../../public/icons/footer/Chat.svg';
import User from '../../../public/icons/footer/Users.svg';
import DOCOn from '../../../public/icons/footer/DocOn.svg';
import GraphOn from '../../../public/icons/footer/GraphOn.svg';
import ChatOn from '../../../public/icons/footer/ChatOn.svg';
import UserOn from '../../../public/icons/footer/UsersOn.svg';

export const FOOTERPB = 'pb-21';
const Footer = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: '홈', path: '/home', offIcon: DOC, onIcon: DOCOn },
    { label: '리포트', path: '/report', offIcon: Graph, onIcon: GraphOn },
    { label: '소셜', path: '/social', offIcon: Chat, onIcon: ChatOn },
    { label: '마이페이지', path: '/mypage', offIcon: User, onIcon: UserOn },
  ];

  const isActive = (path: string) => {
    if (path === '/home') return pathname === '/home';
    return pathname.startsWith(path);
  };

  return (
    <footer
      className="fixed bottom-0 left-1/2 z-50 h-21 w-full max-w-106.25 -translate-x-1/2 rounded-t-2xl bg-white/70 backdrop-blur-md transition-all"
      style={{ boxShadow: '0px -5px 15px 0px rgba(219, 235, 254, 0.6)' }}
    >
      <div className="mx-auto grid h-full max-w-7xl grid-cols-4 px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              className={`flex flex-col items-center justify-center gap-y-1.5 transition-all active:scale-95 ${
                active ? 'text-primary-blue-500' : 'text-opacity-black-40'
              }`}
              to={item.path}
            >
              <div className="relative flex h-7 w-7 items-center justify-center">
                <img
                  src={active ? item.onIcon : item.offIcon}
                  className="h-full w-full object-contain"
                  alt={item.label}
                />
              </div>
              <span className="text-caption-12B">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
