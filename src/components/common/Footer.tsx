import { Link, useLocation } from 'react-router-dom';
import DOC from '../../../public/icons/footer/Doc.svg';
import Graph from '../../../public/icons/footer/Graph.svg';
import Chat from '../../../public/icons/footer/Chat.svg';
import User from '../../../public/icons/footer/Users.svg';
import DOCOn from '../../../public/icons/footer/DocOn.svg';
import GraphOn from '../../../public/icons/footer/GraphOn.svg';
import ChatOn from '../../../public/icons/footer/ChatOn.svg';
import UserOn from '../../../public/icons/footer/UsersOn.svg';

const Footer = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: '홈', path: '/', offIcon: DOC, onIcon: DOCOn },
    { label: '리포트', path: '/report', offIcon: Graph, onIcon: GraphOn },
    { label: '소셜', path: '/social', offIcon: Chat, onIcon: ChatOn },
    { label: '마이페이지', path: '/mypage/profile', offIcon: User, onIcon: UserOn },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <footer
      className="z-50 h-21 w-full rounded-t-2xl bg-white"
      style={{ boxShadow: '0px -5px 10px 0px rgba(219, 235, 254, 0.8)' }}
    >
      <div className="mx-auto grid h-full max-w-screen-xl grid-cols-4">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              className={`text-12 flex flex-col items-center justify-center gap-y-2 p-1 transition-colors ${
                active ? 'font-bold text-[#4E83F9]' : 'font-medium text-[#5D5D5D]'
              }`}
              to={item.path}
            >
              <img src={active ? item.onIcon : item.offIcon} className="h-7 w-7" alt={item.label} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
