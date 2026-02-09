import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import HotBoardItem from './HotBoardItem';
import { MOCK_POSTS } from '../../mocks/social/boardPosts';
import { useNavigate } from 'react-router-dom';

const SLIDE_COUNT = 5;

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

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex items-center justify-between">
        <span className="text-heading-18B text-base-900">🔥 이번 주 HOT 게시판</span>
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
          {MOCK_POSTS.slice(0, SLIDE_COUNT).map((post) => (
            <SwiperSlide key={post.id}>
              <HotBoardItem post={post} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 인디케이터 점 */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: SLIDE_COUNT }).map((_, idx) => (
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
