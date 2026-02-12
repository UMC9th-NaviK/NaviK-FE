import { useEffect, useMemo, useState } from 'react';
import MinusIcon from '../../assets/social/material-symbols_do-not-disturb-on-outline-rounded.svg';
import PlusIcon from '../../assets/social/material-symbols_add-circle-outline-rounded.svg';
import MinusIcon2 from '../../assets/social/material-symbols_do-not-disturb-on-outline-rounded (1).svg';
import PlusIcon2 from '../../assets/social/material-symbols_add-circle-outline-rounded (1).svg';

import SkillSelector from '../../components/social/study/SkillSelector';
import PeopleAndFrequency from '../../components/social/study/PeopleAndFrequency';
import DateRangeCalendar from '../../components/social/study/DateRangeCalendar';

import type { DateRange } from 'react-day-picker';
import Divider from '../../components/common/Divider';

import { createStudy, getStudyKpiCards } from '../../apis/study';
import type { KpiCard } from '../../types/study';

const formatKo = (d?: Date) => {
  if (!d) return '';
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

const itemsPM = [
  '문제 정의&가설 수립',
  '데이터 기반 의사결정',
  '서비스 구조&핵심 플로우 결정',
  '요구사항 정의·정책 설계',
  '실험·검증 기반 의사결정',
  '우선순위&스코프 관리',
  '실행력&오너십',
  '의사결정 정렬&협업 조율',
  'AI/LLM 활용 기획',
  '사용자 리서치&공감',
];
const itemsDesigner = [
  'UX 전략&문제 재정의',
  '정보 구조&사용자 플로우 설계',
  'UI 시각 디자인&비주얼 완성도',
  '프로토타이핑&인터랙션 구현',
  '디자인 시스템 구축·운영',
  '데이터 기반 UX 개선',
  'AI 디자인 활용 능력',
  '멀티 플랫폼 이해',
  '협업&커뮤니케이션 역량',
  'BX/BI 브랜드 경험 설계',
];
const itemsFront = [
  '웹 기본기',
  '프레임워크 숙련도',
  '상태관리&컴포넌트 아키텍쳐',
  '웹 성능 최적화',
  'API 연동&비동기 처리',
  '반응형·크로스 브라우징 대응',
  '테스트 코드&품질 관리',
  'Git·PR·협업 프로세스 이해',
  '사용자 중심 UI 개발',
  '빌드·도구 환경 이해',
];
const itemsBack = [
  '주력 언어&프레임워크 숙련도',
  'REST API 설계·구현',
  'DB·데이터 모델링',
  '아키텍쳐 설계',
  '클라우드·DevOps 환경 이해',
  '성능·트래픽 처리 최적화',
  '보안·인증·권한 처리',
  '테스트·코드 품질 관리',
  '협업·문서화&의사결정 기록',
  '운영·모니터링&장애 대응',
];

const roleLabels = ['PM', '디자이너', '프론트엔드', '백엔드'] as const;
const modeLabels = ['온라인', '오프라인', '온/오프라인'] as const;
const synergyLabels = ['같은 직무끼리 모이기', '다양한 직무와 섞이기'] as const;
const peopleLabels = ['2', '3', '4', '5', '6'] as const;

type SelectedSkill = { roleIndex: number; itemIndex: number; text: string } | null;

const jobNameByRoleIndex: Record<number, string> = {
  0: '프로덕트 매니저',
  1: '프로덕트 디자이너',
  2: '프론트엔드 개발자',
  3: '백엔드 개발자',
};

const jobIdByRoleIndex: Record<number, number> = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
};

const NewStudyPage = () => {
  //입력값
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openChatUrl, setOpenChatUrl] = useState('');

  //역량
  const [selectedSkill, setSelectedSkill] = useState<SelectedSkill>(null);

  //KPI 캐시
  const [kpiCache, setKpiCache] = useState<Record<number, KpiCard[]>>({});
  const [kpiLoading, setKpiLoading] = useState(false);

  const getItemsByRole = (idx: number) => {
    const cached = kpiCache[idx];
    if (cached && cached.length > 0) return cached.map((k) => k.name);

    switch (idx) {
      case 0:
        return itemsPM;
      case 1:
        return itemsDesigner;
      case 2:
        return itemsFront;
      case 3:
        return itemsBack;
      default:
        return itemsPM;
    }
  };

  //roleIndex(직무) 선택되면 해당 직무 KPI 카드 불러와서 캐싱
  useEffect(() => {
    const roleIndex = selectedSkill?.roleIndex;
    if (roleIndex === undefined || roleIndex === null) return;
    if (kpiCache[roleIndex]?.length) return;

    const fetch = async () => {
      try {
        setKpiLoading(true);
        const jobName = jobNameByRoleIndex[roleIndex];

        const res = await getStudyKpiCards({ jobName, size: 50 });
        if (!res.data.isSuccess) return;

        setKpiCache((prev) => ({
          ...prev,
          [roleIndex]: res.data.result.content,
        }));
      } catch (e) {
        console.error(e);
      } finally {
        setKpiLoading(false);
      }
    };

    fetch();
  }, [selectedSkill?.roleIndex]);

  //인원, 빈도
  const [activePeopleIndex, setActivePeopleIndex] = useState<number | null>(null);
  const [count, setCount] = useState(1);
  const handleDecrease = () => setCount((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setCount((prev) => Math.min(7, prev + 1));

  //날짜
  const [range, setRange] = useState<DateRange>({ from: undefined, to: undefined });
  const handleDayClick = (day: Date) => {
    setRange((prev) => {
      if (!prev.from || (prev.from && prev.to)) {
        return { from: day, to: undefined };
      }
      if (day < prev.from) {
        return { from: day, to: undefined };
      }
      return { from: prev.from, to: day };
    });
  };

  const isSameDay = (a?: Date, b?: Date) =>
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isBetween = (d: Date, from?: Date, to?: Date) => {
    if (!from || !to) return false;
    const time = new Date(d).setHours(0, 0, 0, 0);
    const f = new Date(from).setHours(0, 0, 0, 0);
    const t = new Date(to).setHours(0, 0, 0, 0);
    return f < time && time < t;
  };
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthDown = () => {
    if (
      currentDate.getFullYear() < today.getFullYear() ||
      (currentDate.getFullYear() === today.getFullYear() &&
        currentDate.getMonth() <= today.getMonth())
    ) {
      return;
    }
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleMonthUp = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    const days: { date: number; currentMonth: boolean; id: string }[] = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ date: lastDateOfPrevMonth - i, currentMonth: false, id: `prev-${i}` });
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
      days.push({ date: i, currentMonth: true, id: `curr-${i}` });
    }
    return days;
  };

  const calendarDays = renderCalendar();
  const selectMonth =
    currentDate.getFullYear() > today.getFullYear() ||
    (currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() > today.getMonth());

  const [activeModeIndex, setActiveModeIndex] = useState<number | null>(null);
  const [activeSynergyIndex, setActiveSynergyIndex] = useState<number | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (submitting) return;

    if (!title.trim()) return alert('스터디명을 입력해주세요.');
    if (!description.trim()) return alert('한줄 소개를 입력해주세요.');
    if (!selectedSkill) return alert('역량(KPI)을 선택해주세요.');
    if (activePeopleIndex === null) return alert('인원을 선택해주세요.');
    if (!range.from || !range.to) return alert('활동 기간을 선택해주세요.');
    if (activeModeIndex === null) return alert('참여 방식을 선택해주세요.');
    if (activeSynergyIndex === null) return alert('시너지를 선택해주세요.');
    if (!openChatUrl.trim()) return alert('오픈채팅 링크를 입력해주세요.');

    const roleIndex = selectedSkill.roleIndex;

    try {
      setSubmitting(true);

      // 1) KPI 카드 목록 조회(캐시 없으면 조회)
      let cards = kpiCache[roleIndex];
      if (!cards || cards.length === 0) {
        setKpiLoading(true);
        const jobName = jobNameByRoleIndex[roleIndex];

        const res = await getStudyKpiCards({ jobName, size: 100 });
        if (!res.data.isSuccess) {
          alert(res.data.message ?? 'KPI 카드 조회에 실패했어요.');
          return;
        }

        cards = res.data.result.content;

        setKpiCache((prev) => ({
          ...prev,
          [roleIndex]: cards!,
        }));
      }

      // 2) 선택된 KPI 이름(text)로 kpiId 찾기
      const matched = cards.find((k) => k.name === selectedSkill.text);
      if (!matched) {
        alert('선택한 KPI를 서버 목록에서 찾지 못했어요. 다시 선택해주세요.');
        return;
      }
      const kpiId = matched.kpiId;

      // 3) 스터디 생성 payload
      const capacity = Number(peopleLabels[activePeopleIndex]);
      const startDate = new Date(range.from).toISOString();
      const endDate = new Date(range.to).toISOString();

      const participationMethod = modeLabels[activeModeIndex]; // "온라인" | "오프라인" | "온/오프라인"
      const synergyType = activeSynergyIndex === 0 ? 'SAME_JOB' : 'DIVERSE_JOB';

      const jobId = jobIdByRoleIndex[roleIndex];

      const createRes = await createStudy({
        title: title.trim(),
        capacity,
        description: description.trim(),
        jobId,
        kpiId,
        participationMethod,
        synergyType,
        startDate,
        endDate,
        openChatUrl: openChatUrl.trim(),
        weekTime: count,
      });

      if (!createRes.data.isSuccess) {
        alert(createRes.data.message ?? '스터디 생성에 실패했어요.');
        return;
      }

      const studyId = createRes.data.result;
      alert('스터디가 생성됐어요!');
      console.log('created studyId:', studyId);
    } catch (e) {
      console.error(e);
      alert('요청 중 오류가 발생했어요.');
    } finally {
      setSubmitting(false);
      setKpiLoading(false);
    }
  };
  const submitButtonText = useMemo(() => {
    if (submitting) return '등록중...';
    if (kpiLoading) return 'KPI 불러오는 중...';
    return '등록하기';
  }, [submitting, kpiLoading]);

  return (
    <div className="mb-8">
      <div className="mt-8 self-stretch">
        <span className="text-[16px] leading-[140%] font-semibold tracking-[-0.32px] text-[#2C2C2C]">
          원하는 스터디가 없나요?
          <br />
          직접 만들어 팀원을 모집해보세요
        </span>
      </div>

      <div className="mt-4">
        <div className="flex flex-col self-stretch rounded-[16px] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]">
          <div className="w-full">
            {/*스터디명 */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">멋진 스터디 이름을 지어주세요.</span>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="내용을 입력해주세요."
                className="text-caption-12R focus:border-primary-blue-500 mt-2 w-full rounded-[8px] border border-[#B8D4FE] bg-white p-[8px] text-[#111111] placeholder:text-[rgba(17,17,17,0.4)] focus:outline-none"
              />
            </div>

            {/*한줄 소개 */}
            <div className="mt-6 flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">
                  어떤 스터디인지 한 문장으로 알려주세요.
                </span>
              </div>

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="내용을 입력해주세요"
                className="text-caption-12R focus:border-primary-blue-500 mt-2 w-full rounded-[8px] border border-[#B8D4FE] bg-white p-[8px] text-[#111111] placeholder:text-[rgba(17,17,17,0.4)] focus:outline-none"
              />
            </div>

            {/*역량 선택(칩+말풍선+선택카드) */}
            <SkillSelector
              roleLabels={roleLabels}
              getItemsByRole={getItemsByRole}
              selectedSkill={selectedSkill}
              onChangeSelectedSkill={setSelectedSkill}
            />

            {/*인원, 빈도 */}
            <PeopleAndFrequency
              peopleLabels={peopleLabels}
              activePeopleIndex={activePeopleIndex}
              onChangePeopleIndex={setActivePeopleIndex}
              count={count}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
              MinusIcon={MinusIcon}
              MinusIcon2={MinusIcon2}
              PlusIcon={PlusIcon}
              PlusIcon2={PlusIcon2}
            />

            <Divider />

            {/*활동기간(range 달력) */}
            <DateRangeCalendar
              range={range}
              onDayClick={handleDayClick}
              formatKo={formatKo}
              currentDate={currentDate}
              onMonthDown={handleMonthDown}
              onMonthUp={handleMonthUp}
              selectMonth={selectMonth}
              week={week}
              calendarDays={calendarDays}
              isSameDay={isSameDay}
              isBetween={isBetween}
            />

            <Divider />

            {/*모드 선택 */}
            <div className="mt-6 flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">어디서 참여하고 싶으신가요?</span>
              </div>

              <div className="mt-2 flex w-full gap-[8px]">
                {modeLabels.map((label, index) => {
                  const isActive = activeModeIndex === index;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActiveModeIndex(index)}
                      className={`text-body-14M flex h-[32px] flex-1 cursor-pointer items-center justify-center rounded-[8px] border px-[16px] py-[8px] whitespace-nowrap transition-colors ${
                        isActive
                          ? 'text-primary-blue-900 border-[#B8D4FE] bg-[#B8D4FE]'
                          : 'text-opacity-black-60 border-[#B8D4FE] bg-white'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/*시너지 선택 */}
            <div className="mt-6 flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">어떤 시너지를 기대하시나요?</span>
              </div>

              <div className="mt-2 flex w-full gap-[8px]">
                {synergyLabels.map((label, index) => {
                  const isActive = activeSynergyIndex === index;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActiveSynergyIndex(index)}
                      className={`text-body-14M flex h-[32px] flex-1 cursor-pointer items-center justify-center rounded-[8px] border px-[16px] py-[8px] whitespace-nowrap transition-colors ${
                        isActive
                          ? 'text-primary-blue-900 border-[#B8D4FE] bg-[#B8D4FE]'
                          : 'text-opacity-black-60 border-[#B8D4FE] bg-white'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/*오픈채팅 */}
            <div className="mt-6 flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">
                  카카오톡 오픈채팅 링크를 입력해주세요.
                </span>
              </div>

              <input
                type="text"
                value={openChatUrl}
                onChange={(e) => setOpenChatUrl(e.target.value)}
                placeholder="입력하기"
                className="text-caption-12R focus:border-primary-blue-500 mt-2 w-full rounded-[8px] border border-[#B8D4FE] bg-white p-[8px] text-[#111111] placeholder:text-[rgba(17,17,17,0.4)] focus:outline-none"
              />
            </div>

            {/*등록하기 */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || kpiLoading}
                className="bg-primary-blue-500 flex h-[48px] w-full cursor-pointer items-center justify-center gap-[10px] self-stretch rounded-[8px] px-[61px] py-[12px] whitespace-nowrap"
              >
                <span className="text-body-16B text-center text-white">{submitButtonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStudyPage;
