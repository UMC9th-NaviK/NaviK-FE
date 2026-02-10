import { useState, useEffect } from 'react';
import { getPositionsCount, searchPositions } from '../apis/recruit';
import { FILTER_MAP } from '../constants/filterMapper';
import type { Recruitment } from '../types/recruits';

export const useJobSearch = (selectedValues: Record<string, string>, isExcludeExpired: boolean) => {
  const [jobs, setJobs] = useState<Recruitment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchJobs = async (cursor?: string) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const body = {
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

      if (!cursor) {
        const count = await getPositionsCount(body);
        setTotalCount(count);
      }

      const result = await searchPositions(body, cursor, 20);
      setJobs((prev) => (cursor ? [...prev, ...result.content] : result.content));
      setNextCursor(result.nextCursor);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('공고 로드 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedValues, isExcludeExpired]);

  return { jobs, totalCount, isLoading, hasNext, nextCursor, fetchJobs };
};
