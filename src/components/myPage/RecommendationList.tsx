import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import RecommandCard from '../../components/myPage/RecommandCard';

const RecommendationList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const totalItems = 20;

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 304;
      const newIndex = Math.round(scrollLeft / cardWidth) + 1;
      if (newIndex !== currentIndex && newIndex > 0 && newIndex <= totalItems) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <div className="flex flex-col bg-white p-5 pt-12">
      <div className="text-heading-20B font-bold text-gray-800">내가 찾는 공고</div>
      <div className="text-body-14M mt-4 text-gray-500">
        <div>핵심 역량 카드를 기반으로 추천되는 공고들이에요.</div>
        <div>원하는 세부 조건 설정으로 보다 나은 추천을 받아보세요!</div>
      </div>

      <div className="mt-4 w-full">
        <div className="flex flex-col gap-y-3 rounded-2xl bg-white p-4 shadow-[0px_0px_15px_0px_rgba(78,131,249,0.15)]">
          <div className="text-caption-12M text-opacity-black-40 mb-1 self-end px-3 py-1">
            {currentIndex} / {totalItems}
          </div>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scrollbar-hide flex snap-x snap-mandatory scroll-pl-4.5 flex-nowrap gap-4 overflow-x-auto scroll-smooth px-4 pb-4"
            style={{
              marginLeft: '-16px',
              marginRight: '-16px',
            }}
          >
            {Array.from({ length: totalItems }).map((_, idx) => (
              <div key={idx} className="w-71 shrink-0 snap-start snap-always">
                <RecommandCard />
              </div>
            ))}

            <div className="w-1 flex-none" />
          </div>
          <Link
            to={'/mypage/recommend'}
            className="text-body-16B bg-primary-blue-500 flex h-12 items-center justify-between rounded-xl px-4 font-bold text-white transition-all hover:bg-[#3b6ed9]"
          >
            맞춤 추천 공고 더보기
            <Icon icon="material-symbols:arrow-forward-ios-rounded" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendationList;
