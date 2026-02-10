import { useState, useEffect } from 'react';
import { getRecruitments } from '../apis/recruit';
import type { Recruitment } from '../types/recruits';

export const useRecruitments = () => {
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchRecruitments = async () => {
    setIsLoading(true);
    try {
      const data = await getRecruitments();
      setRecruitments(data);
    } catch (err) {
      setError(err);
      console.error('공고 로딩 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruitments();
  }, []);

  return { recruitments, isLoading, error, refetch: fetchRecruitments };
};
