import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import HotBoardItem from './HotBoardItem';
import { useNavigate } from 'react-router-dom';
import { useHotBoardList } from '../../hooks/queries/useBoardList';

const HotBoardSection = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrent(swiper.activeIndex);
  };

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const { data, isLoading, isError } = useHotBoardList();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-4">
        <div className="flex items-center justify-between">
          <span className="text-heading-18B text-base-900">🔥지금 주목받는 커리어 고민</span>
          <button
            className="text-opacity-black-60 text-caption-12M flex items-center gap-1"
            onClick={() => navigate('/social/board')}
          >
            더보기
            <img src="/icons/reports/arrow-right-gray.svg" className="h-4 w-4" alt="" />
          </button>
        </div>

        <div className="border-base-100 bg-base-100/40 shadow-card text-base-700 flex h-59.5 items-center justify-center rounded-2xl border">
          불러오는 중...
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col gap-4 px-4">
        <div className="flex items-center justify-between">
          <span className="text-heading-18B text-base-900">🔥지금 주목받는 커리어 고민</span>
          <button
            className="text-opacity-black-60 text-caption-12M flex items-center gap-1"
            onClick={() => navigate('/social/board')}
          >
            더보기
            <img src="/icons/reports/arrow-right-gray.svg" className="h-4 w-4" alt="" />
          </button>
        </div>

        <div className="border-base-100 bg-base-100/40 shadow-card text-base-700 flex h-59.5 items-center justify-center rounded-2xl border">
          오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex items-center justify-between">
        <span className="text-heading-18B text-base-900">🔥지금 주목받는 커리어 고민</span>
        <button
          className="text-opacity-black-60 text-caption-12M flex items-center gap-1"
          onClick={() => navigate('/social/board')}
        >
          더보기
          <img src="/icons/reports/arrow-right-gray.svg" className="h-4 w-4" alt="" />
        </button>
      </div>

      <div className="border-base-100 bg-base-100/40 shadow-card flex flex-col gap-4 rounded-2xl border p-4">
        {/* Swiper 슬라이더 */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          centeredSlides={true}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="w-full"
        >
          {data?.slice(0, 5).map((post) => (
            <SwiperSlide key={post.boardId}>
              <HotBoardItem post={post} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 인디케이터 점 */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: Math.min(data?.length ?? 0, 5) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 w-2 rounded-full transition-all duration-200 ${
                idx === current ? 'bg-primary-blue-500' : 'bg-base-200'
              }`}
              aria-label={`슬라이드 ${idx + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotBoardSection;
