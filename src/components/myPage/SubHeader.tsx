import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SubHeaderProps {
  title: string;
  bgColor?: string;
  showInfo?: boolean;
  infoContent?: string;
}

const SubHeader = ({
  title,
  bgColor = 'bg-[#F5F9FF]',
  showInfo = false,
  infoContent = '콘텐츠 내용이 없습니다..!',
}: SubHeaderProps) => {
  const navigate = useNavigate();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className={`w-full ${bgColor} relative h-18`}>
      <div className="relative flex h-18 w-full items-center justify-between px-4">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="transition-active flex h-10 w-10 items-center justify-center"
        >
          <Icon
            icon="material-symbols:arrow-back-ios-new-rounded"
            className="text-base-500 h-6 w-6"
          />
        </button>

        {/* 타이틀 */}
        <h1 className="text-base-900 text-heading-20B">{title}</h1>

        {/* 도움말 영역 */}
        <div className="relative flex h-10 w-10 items-center justify-center">
          {showInfo ? (
            <>
              <button
                onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                className="transition-active flex h-full w-full items-center justify-center"
              >
                <Icon
                  icon="material-symbols:info-outline-rounded"
                  className="text-base-500 h-6 w-6"
                />
              </button>

              {/* 말풍선 */}
              {isTooltipOpen && (
                <div className="animate-in fade-in zoom-in border-base-300 absolute top-12 right-0 z-100 w-52 rounded-xl border bg-white p-3 shadow-[0px_8px_24px_rgba(148,187,253,0.4)] duration-200">
                  <div className="text-caption-12R text-opacity-black-60 leading-relaxed">
                    {infoContent}
                  </div>

                  {/* 말풍선 꼬리 */}
                  <div className="border-base-300 absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-t border-l bg-white" />
                </div>
              )}
            </>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
