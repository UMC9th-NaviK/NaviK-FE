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

const roleLabels = ['PM', '디자이너', '프론트엔드', '백엔드'] as const;
const modeLabels = ['온라인', '오프라인', '온/오프라인'] as const;
const synergyLabels = ['같은 직무끼리 모이기', '다양한 직무와 섞이기'] as const;
const peopleLabels = ['2', '3', '4', '5', '6'] as const;

export type SelectedSkill = { roleIndex: number; kpiId: number; name: string } | null;

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openChatUrl, setOpenChatUrl] = useState('');

  const [selectedSkill, setSelectedSkill] = useState<SelectedSkill>(null);

  const [kpiCache, setKpiCache] = useState<Record<number, KpiCard[]>>({});
  const [kpiLoading, setKpiLoading] = useState(false);

  const [activeRoleIndex, setActiveRoleIndex] = useState<number | null>(null);
  useEffect(() => {
    if (activeRoleIndex === null) return;
    if (kpiCache[activeRoleIndex]?.length) return;

    const fetchKpi = async () => {
      try {
        setKpiLoading(true);

        const jobName = jobNameByRoleIndex[activeRoleIndex];
        console.log('[KPI] fetching for roleIndex:', activeRoleIndex, jobName);

        const res = await getStudyKpiCards({ jobName, size: 50 });
        console.log('[KPI] response:', res.data);

        if (!res.data.isSuccess) return;

        setKpiCache((prev) => ({
          ...prev,
          [activeRoleIndex]: res.data.result.content,
        }));
      } catch (e) {
        console.error(e);
      } finally {
        setKpiLoading(false);
      }
    };

    fetchKpi();
  }, [activeRoleIndex]);

  const [activePeopleIndex, setActivePeopleIndex] = useState<number | null>(null);
  const [count, setCount] = useState(1);
  const handleDecrease = () => setCount((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setCount((prev) => Math.min(7, prev + 1));

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
    const kpiId = selectedSkill.kpiId; // ✅ 이름 매칭 제거! 바로 사용
    const jobId = jobIdByRoleIndex[roleIndex];

    try {
      setSubmitting(true);

      const capacity = Number(peopleLabels[activePeopleIndex]);
      const startDate = new Date(range.from).toISOString();
      const endDate = new Date(range.to).toISOString();

      const participationMethod = modeLabels[activeModeIndex];
      const synergyType = activeSynergyIndex === 0 ? 'SAME_JOB' : 'DIVERSE_JOB';

      console.log('[CREATE] payload:', {
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

  console.log('[UI] kpiCache keys:', Object.keys(kpiCache));
  console.log('[UI] kpiCache[3] length:', (kpiCache[3] ?? []).length);

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
            {/* 스터디명 */}
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

            {/* 한줄 소개 */}
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

            {/* 역량 선택 */}
            <SkillSelector
              roleLabels={roleLabels}
              kpiCardsByRole={kpiCache}
              kpiLoading={kpiLoading}
              selectedSkill={selectedSkill}
              onSelect={(skill) => setSelectedSkill(skill)}
              onOpenRole={setActiveRoleIndex}
            />

            {/* 인원, 빈도 */}
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

            {/* 활동기간 */}
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

            {/* 모드 선택 */}
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

            {/* 시너지 선택 */}
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

            {/* 오픈채팅 */}
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

            {/* 등록하기 */}
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
