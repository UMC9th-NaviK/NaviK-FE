import { useEffect, useRef, useState } from 'react';

type Props = {
  MoreIcon: string;
  EditIcon: string;
  DeleteIcon: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PostOptionsMenu({
  MoreIcon,
  EditIcon,
  DeleteIcon,
  onEdit,
  onDelete,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label="게시글 옵션"
        className="flex h-8 w-8 cursor-pointer items-center justify-center"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <img src={MoreIcon} alt="" className="h-6 w-6" />
      </button>

      {menuOpen && (
        <div
          className="bg-base-100 absolute top-9 right-0 z-50 w-[220px] overflow-hidden rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
          role="menu"
          aria-label="게시글 옵션 메뉴"
        >
          <button
            type="button"
            className="flex h-11 w-full cursor-pointer items-center justify-between px-4"
            onClick={() => {
              setMenuOpen(false);
              onEdit();
            }}
          >
            <span className="text-body-16R text-opacity-black-80 flex flex-1 truncate overflow-hidden">
              수정
            </span>
            <img src={EditIcon} alt="" className="h-4 w-4" />
          </button>

          <div className="h-[0.5px] w-full bg-[rgba(128,128,128,0.55)]" />

          <button
            type="button"
            className="flex h-11 w-full cursor-pointer items-center justify-between px-4"
            onClick={() => {
              setMenuOpen(false);
              onDelete();
            }}
          >
            <span className="text-body-16R text-opacity-black-80 flex flex-1 truncate overflow-hidden">
              삭제
            </span>
            <img src={DeleteIcon} alt="" className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
