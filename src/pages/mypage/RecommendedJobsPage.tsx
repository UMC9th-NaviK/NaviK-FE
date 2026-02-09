import { useState, useEffect } from 'react';
import { BottomSheet } from '../../components/myPage/recommend/BottomSheet';
import { FilterBar } from '../../components/myPage/recommend/FilterBar';
import { FILTERS } from '../../constants/filterData';
import { Icon } from '@iconify/react';
import { JobCard } from '../../components/myPage/recommend/JobCard';
import SubHeader from '../../components/myPage/SubHeader';
import { searchPositions } from '../../apis/recruit';
import { FILTER_MAP } from '../../constants/filterMapper';
import type { Recruitment } from '../../types/recruits';

const RecommendJobPage = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [isExcludeExpired, setIsExcludeExpired] = useState(false);

  // --- API 데이터 상태 관리 ---
  const [jobs, setJobs] = useState<Recruitment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- 데이터 변환 및 API 호출 로직 ---
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const body = {
        // 값이 있으면 배열에 담고, 없으면 null/undefined 대신 빈 배열([])을 할당!
        jobTypes: selectedValues['희망 직무']
          ? [FILTER_MAP['희망 직무'][selectedValues['희망 직무']]]
          : [],
        experienceTypes: selectedValues['경력 요건']
          ? [FILTER_MAP['경력 요건'][selectedValues['경력 요건']]]
          : [],
        employmentTypes: selectedValues['고용 형태']
          ? [FILTER_MAP['고용 형태'][selectedValues['고용 형태']]]
          : [],
        companySizes: selectedValues['회사 규모']
          ? [FILTER_MAP['회사 규모'][selectedValues['회사 규모']]]
          : [],
        educationLevels: selectedValues['학력'] ? [FILTER_MAP['학력'][selectedValues['학력']]] : [],
        areaTypes: selectedValues['근무 지역']
          ? [FILTER_MAP['근무 지역'][selectedValues['근무 지역']]]
          : [],
        industryTypes: selectedValues['관심 산업']
          ? [FILTER_MAP['관심 산업'][selectedValues['관심 산업']]]
          : [],
        withEnded: !isExcludeExpired,
      };

      const result = await searchPositions(body, undefined, 20);
      setJobs(result.content);
      console.log(result.content);
    } catch (error) {
      console.error('공고 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 필터나 마감 공고 제외 여부가 바뀔 때마다 실행
  useEffect(() => {
    fetchJobs();
  }, [selectedValues, isExcludeExpired]);

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
      {/* 배경 원 - 디자인 유지 */}
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

      {/* 헤더 + 필터바 영역 (고정) - 디자인 유지 */}
      <div className="relative z-10 shrink-0">
        <SubHeader
          title={'추천 공고'}
          bgColor="bg-white"
          showInfo={true}
          infoContent="나의 강점 KPI를 가장 잘 살릴 수 있는 공고를 추천해요. 희망 직무, 고용 형태 등 원하는 조건을 설정하면 더 정확한 공고를 확인할 수 있어요."
        />
        <FilterBar
          filters={FILTERS}
          selectedValues={selectedValues}
          activeFilter={activeFilter}
          onFilterClick={setActiveFilter}
          onResetAll={handleResetAll}
        />

        <div className="flex w-full items-center justify-between px-4 pt-4 pb-2">
          {/* MOCK_JOBS 대신 실제 받아온 jobs 개수 표시 */}
          <div className="text-body-14B">공고 {jobs.length}건</div>
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

      {/* 리스트 - 실제 데이터 매핑 */}
      <div className="scrollbar-hide relative z-10 flex-1 overflow-y-auto px-4 pb-20">
        <div className="flex flex-col gap-4 pt-2">
          {isLoading ? (
            <div className="py-20 text-center text-gray-400">공고를 불러오는 중입니다...</div>
          ) : (
            jobs.map((job) => <JobCard key={job.id} data={job} />)
          )}
          {!isLoading && jobs.length === 0 && (
            <div className="py-20 text-center text-gray-400">조건에 맞는 공고가 없습니다.</div>
          )}
        </div>
      </div>

      {/* 바텀시트 - 디자인 유지 */}
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
