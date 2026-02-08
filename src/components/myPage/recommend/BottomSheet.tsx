import { Icon } from '@iconify/react';

interface BottomSheetProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  children: React.ReactNode;
  canReset: boolean;
}

export const BottomSheet = ({
  title,
  isOpen,
  onClose,
  onReset,
  children,
  canReset,
}: BottomSheetProps) => {
  if (!isOpen) return null;

  return (
    <div className="animate-fade-in bg-opacity-black-40 fixed inset-0 z-500 flex items-end justify-center">
      <div className="absolute inset-0 z-0" onClick={onClose} />

      <div className="animate-slide-up bg-base-100 relative z-10 w-full max-w-md rounded-t-2xl pb-8.5">
        {/*취소*/}
        <div className="border-b-base-200 relative flex h-16 w-full items-center justify-between border-b px-4">
          <button
            onClick={onClose}
            className="text-24 text-opacity-black-60 flex h-10 w-10 items-center justify-center"
          >
            <Icon icon="material-symbols:close-rounded" />
          </button>

          {/*타이틀*/}
          <div className="text-heading-18SB text-base-900 absolute left-1/2 -translate-x-1/2">
            {title}
          </div>

          {/* 초기화 버튼 */}
          <button
            onClick={onReset}
            disabled={!canReset}
            className={`flex h-10 items-center gap-1 px-2 transition-colors ${
              canReset ? 'text-opacity-black-60' : 'text-opacity-black-20 cursor-not-allowed'
            }`}
          >
            <Icon
              icon="material-symbols:change-circle-outline-rounded"
              className={`text-24 ${canReset ? 'text-opacity-black-60' : 'text-opacity-black-20'}`}
            />
            <span className="text-caption-12M">초기화</span>
          </button>
        </div>

        {/* 버튼 그룹 */}
        <div className="max-h-[60vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
