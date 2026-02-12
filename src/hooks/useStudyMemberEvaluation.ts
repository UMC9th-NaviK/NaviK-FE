import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getStudyEvaluationTargets, createStudyEvaluation } from '../apis/evaluation';
import { TAG_ID_MAP } from '../constants/evaluationData';
import type { CreateEvaluationReq } from '../types/evaluation';

export const useStudyMemberEvaluation = (studyId: string | undefined) => {
  const navigate = useNavigate();

  // 상태 관리
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [strengthTags, setStrengthTags] = useState<string[]>([]);
  const [improvementTags, setImprovementTags] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [errorItem, setErrorItem] = useState<string | null>(null);

  // 1. 평가 대상 목록 조회
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['evaluationTargets', studyId],
    queryFn: () => getStudyEvaluationTargets(Number(studyId)),
    enabled: !!studyId,
  });

  // 2. 평가 제출
  const { mutate: submitEvaluation, isPending } = useMutation({
    mutationFn: (body: CreateEvaluationReq) => createStudyEvaluation(Number(studyId), body),
    onSuccess: () => {
      alert('평가 제출이 완료되었습니다!');
      navigate(-1);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverResponse = error.response?.data;
        const errorMessage = serverResponse?.body?.message || serverResponse?.message;
        alert(errorMessage || '평가 제출 중 오류가 발생했습니다.');
      }
    },
  });

  // 태그 선택 로직
  const handleToggleTag = (type: 'STRENGTH' | 'IMPROVEMENT', clickedItem: string) => {
    const isStrength = type === 'STRENGTH';
    const currentTags = isStrength ? strengthTags : improvementTags;
    const setTags = isStrength ? setStrengthTags : setImprovementTags;

    if (currentTags.includes(clickedItem)) {
      setTags(currentTags.filter((t) => t !== clickedItem));
    } else {
      if (currentTags.length >= 5) {
        setErrorItem(clickedItem);
        setTimeout(() => setErrorItem(null), 500);
        return;
      }
      setTags([...currentTags, clickedItem]);
    }
  };

  // 멤버 변경 시 초기화
  const handleSelectMember = (id: number) => {
    setSelectedMember(id);
    setStrengthTags([]);
    setImprovementTags([]);
    setRating(0);
    setComment('');
  };

  const handleSubmit = () => {
    if (!selectedMember || !studyId) return;
    submitEvaluation({
      targetUserId: selectedMember,
      score: rating,
      strengthTagIds: strengthTags.map((tag) => TAG_ID_MAP[tag]),
      weaknessTagIds: improvementTags.map((tag) => TAG_ID_MAP[tag]),
      advice: comment,
    });
  };

  return {
    state: {
      response,
      isLoading,
      isError,
      selectedMember,
      strengthTags,
      improvementTags,
      rating,
      comment,
      errorItem,
      isPending,
    },
    actions: {
      handleToggleTag,
      handleSubmit,
      handleSelectMember,
      setRating,
      setComment,
    },
  };
};
