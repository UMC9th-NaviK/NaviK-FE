import { useState } from 'react';
import { BottomSheet } from '../../components/myPage/recommend/BottomSheet';
import { FilterBar } from '../../components/myPage/recommend/FilterBar';
import { FILTERS } from '../../constants/filterData';
import { Icon } from '@iconify/react';
import { JobCard } from '../../components/myPage/recommend/JobCard';
import SubHeader from '../../components/myPage/SubHeader';
import { useJobSearch } from '../../hooks/useJobSearch';

const RecommendJobPage = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [isExcludeExpired, setIsExcludeExpired] = useState(false);

  const { jobs, totalCount, isLoading, hasNext, nextCursor, fetchJobs } = useJobSearch(
    selectedValues,
    isExcludeExpired,
  );

  // 스크롤 핸들러
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && !isLoading && hasNext) {
      fetchJobs(nextCursor || undefined);
    }
  };

  const handleItemClick = (filterLabel: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [filterLabel]: value }));
    setActiveFilter(null);
  };

  const handleResetSingle = () => {
    if (activeFilter) {
      const newState = { ...selectedValues };
      delete newState[activeFilter];
      setSelectedValues(newState);
    }
  };

  const handleResetAll = () => setSelectedValues({});

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-white">
      {/* 배경 원 */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 opacity-60"
        style={{
          width: '628px',
          height: '628px',
          background:
            'radial-gradient(50% 50% at 50% 50%, #94BBFD 0%, rgba(184, 212, 254, 0) 100%)',
          zIndex: 0,
          top: '160px',
        }}
      />

      {/* 헤더 + 필터바 */}
      <div className="relative z-10 shrink-0">
        <SubHeader
          title={'추천 공고'}
          bgColor="bg-white"
          showInfo={true}
          infoContent="나의 강점 KPI를 가장 잘 살릴 수 있는 공고를 추천해요..."
        />
        <FilterBar
          filters={FILTERS}
          selectedValues={selectedValues}
          activeFilter={activeFilter}
          onFilterClick={setActiveFilter}
          onResetAll={handleResetAll}
        />

        <div className="flex w-full items-center justify-between px-4 pt-4 pb-2">
          <div className="text-body-14B">공고 {totalCount.toLocaleString()}건</div>
          <button
            onClick={() => setIsExcludeExpired(!isExcludeExpired)}
            className="text-primary-blue-500 flex items-center gap-1"
          >
            <Icon
              icon={
                isExcludeExpired
                  ? 'material-symbols:check-box-rounded'
                  : 'material-symbols:square-outline-rounded'
              }
              className="text-16"
            />
            <div className="text-caption-12M">마감 공고 제외</div>
          </button>
        </div>
      </div>

      {/* 리스트 영역 */}
      <div
        onScroll={handleScroll}
        className="scrollbar-hide relative z-10 flex-1 overflow-y-auto px-4 pb-20"
      >
        <div className="flex flex-col gap-4 pt-2">
          {/*  처음 데이터 로딩 시 */}
          {isLoading && jobs.length === 0 ? (
            <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-6">
              <Icon
                icon="line-md:loading-twotone-loop"
                style={{ width: '80px', height: '80px' }}
                className="text-primary-blue-500"
              />
              <div className="flex flex-col items-center gap-2">
                <p className="text-opacity-black-60 text-body-16B">맞춤 공고 분석 중</p>
              </div>
            </div>
          ) : (
            <>
              {jobs.map((job, index) => (
                <JobCard key={`${job.id}-${index}`} data={job} />
              ))}

              {/* 추가 데이터 로딩 스피너 */}
              {isLoading && (
                <div className="flex justify-center py-10">
                  <Icon
                    icon="line-md:loading-twotone-loop"
                    style={{ width: '40px', height: '40px' }}
                    className="text-primary-blue-500"
                  />
                </div>
              )}

              {!isLoading && jobs.length === 0 && (
                <div className="text-base-400 py-20 text-center">조건에 맞는 공고가 없습니다.</div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 바텀시트 */}
      <BottomSheet
        title={activeFilter || ''}
        isOpen={!!activeFilter}
        onClose={() => setActiveFilter(null)}
        onReset={handleResetSingle}
        canReset={!!selectedValues[activeFilter || '']}
      >
        <div className="flex w-full flex-wrap gap-x-2 gap-y-3 px-4 py-6">
          {FILTERS.find((f) => f.label === activeFilter)?.items?.map((item) => (
            <button
              key={item}
              onClick={() => handleItemClick(activeFilter!, item)}
              className={`rounded-full border-[0.5px] px-4 py-1.5 transition-all ${
                selectedValues[activeFilter!] === item
                  ? 'border-primary-blue-500 bg-primary-blue-500 text-body-16SB text-white'
                  : 'border-base-300 text-opacity-black-60 bg-base-100 text-body-16R'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

export default RecommendJobPage;
