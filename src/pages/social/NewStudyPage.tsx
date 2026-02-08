import { useEffect, useRef, useState } from 'react';
import MinusIcon from '../../assets/social/material-symbols_do-not-disturb-on-outline-rounded.svg';
import PlusIcon from '../../assets/social/material-symbols_add-circle-outline-rounded.svg';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import Divider from '../../components/common/Divider';
const BG = '#F5F5F5';
type Target = 'from' | 'to';
const formatKo = (d?: Date) => {
  if (!d) return '';
  return `${d.getFullYear() + 1}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
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
const NewStudyPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeModeIndex, setActiveModeIndex] = useState<number | null>(null);
  const [activeSynergyIndex, setActiveSynergyIndex] = useState<number | null>(null);
  const [activePeopleIndex, setActivePeopleIndex] = useState<number | null>(null);
  const [count, setCount] = useState(1);
  const [target, setTarget] = useState<Target>('from');
  const [range, setRange] = useState<DateRange>({ from: undefined, to: undefined });
  const handleDayClick = (day: Date) => {
    setRange((prev) => {
      const from = prev.from;
      const to = prev.to;

      if (target === 'from') {
        if (to && day > to) return { from: day, to: undefined };
        return { from: day, to };
      }
      if (target === 'to') {
        if (!from) return { from: day, to: undefined };
        if (day < from) return { from: day, to: undefined };
        return { from, to: day };
      }
      return prev;
    });
  };
  const handleDecrease = () => {
    setCount((prev) => Math.max(1, prev - 1));
  };
  const handleIncrease = () => {
    setCount((prev) => Math.min(1, prev + 1));
  };
  // 말풍선 위치 계산용
  const bubbleWrapRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [bubbleLeft, setBubbleLeft] = useState(0);

  const getItemsByRole = (idx: number) => {
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

  const syncBubblePos = () => {
    if (activeIndex === null) return;

    const wrap = bubbleWrapRef.current;
    const btn = btnRefs.current[activeIndex];
    if (!wrap || !btn) return;

    const wrapRect = wrap.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const boxW = 199;
    const centerX = btnRect.left - wrapRect.left + btnRect.width / 2;
    let left = centerX - boxW / 2;

    const min = 0;
    const max = wrapRect.width - boxW;
    left = Math.max(min, Math.min(max, left));

    setBubbleLeft(left);
  };

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    syncBubblePos();
    window.addEventListener('resize', syncBubblePos);
    return () => window.removeEventListener('resize', syncBubblePos);
  }, [activeIndex]);
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

    const days = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: lastDateOfPrevMonth - i,
        currentMonth: false,
        id: `prev-${i}`,
      });
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      days.push({
        date: i,
        currentMonth: true,
        id: `curr-${i}`,
      });
    }

    return days;
  };

  const calendarDays = renderCalendar();
  const selectMonth =
    currentDate.getFullYear() > today.getFullYear() ||
    (currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() > today.getMonth());
  return (
    <div>
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
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">멋진 스터디 이름을 지어주세요.</span>
              </div>

              <input
                type="text"
                placeholder="내용을 입력해주세요."
                className="text-caption-12R focus:border-primary-blue-500 mt-2 w-full rounded-[8px] border border-[#B8D4FE] bg-white p-[8px] text-[#111111] placeholder:text-[rgba(17,17,17,0.4)] focus:outline-none"
              />
            </div>
            <div className="mt-6 flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">
                  어떤 스터디인지 한 문장으로 알려주세요.
                </span>
              </div>

              <input
                type="text"
                placeholder="내용을 입력해주세요"
                className="text-caption-12R focus:border-primary-blue-500 mt-2 w-full rounded-[8px] border border-[#B8D4FE] bg-white p-[8px] text-[#111111] placeholder:text-[rgba(17,17,17,0.4)] focus:outline-none"
              />
            </div>
            <div ref={bubbleWrapRef} className="relative mt-6 flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">
                  키우고 싶은 역량을 선택해주세요.
                </span>
              </div>

              <div className="mt-2 flex w-full gap-[8px] overflow-hidden">
                {roleLabels.map((label, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={label}
                      ref={(el) => {
                        btnRefs.current[index] = el;
                      }}
                      type="button"
                      onClick={() => setActiveIndex((prev) => (prev === index ? null : index))}
                      className={`text-body-14M flex h-[32px] min-w-0 flex-1 cursor-pointer items-center justify-center rounded-[8px] border px-[16px] py-[8px] whitespace-nowrap transition-colors ${
                        isActive
                          ? 'text-primary-blue-900 border-[#B8D4FE] bg-[#B8D4FE]'
                          : 'text-opacity-black-60 border-[#B8D4FE] bg-white'
                      } `}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex w-full items-center">
                <div className="flex w-full flex-col rounded-[8px] bg-[#F5F8FF] p-2">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex gap-1">
                      <span className="text-caption-12B text-primary-blue-500">01</span>
                      <span className="text-caption-12M text-opacity-black-80">
                        문제 정의&가설 수립
                      </span>
                    </div>
                    <span className="text-caption-12M text-opacity-black-80">✔️</span>
                  </div>
                </div>
              </div>

              {activeIndex !== null && (
                <div
                  className="absolute z-50"
                  style={{
                    left: bubbleLeft,
                    top: 32 + 8 + 8,
                  }}
                >
                  <div className="flex justify-center">
                    <svg
                      width="16"
                      height="11.942"
                      viewBox="0 0 16 11.942"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 0L16 11.942H0L8 0Z" fill={BG} />
                    </svg>
                  </div>

                  <div
                    className="shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                    style={{
                      width: 208,
                      height: 347,
                      borderRadius: 24,
                      background: BG,
                    }}
                  >
                    <div className="h-full overflow-hidden p-[16px]">
                      <ul className="flex h-full flex-col gap-[14px] overflow-auto">
                        {getItemsByRole(activeIndex).map((t, i) => (
                          <li key={t} className="group relative flex items-start gap-[12px]">
                            <div className="pointer-events-none absolute -inset-[8px] rounded-full bg-[rgba(17,17,17,0.10)] opacity-0 transition-opacity group-hover:opacity-100" />
                            <span className="text-caption-12B text-primary-blue-500 relative z-10 leading-[160%]">
                              {String(i + 1).padStart(2, '0')}
                            </span>

                            <span className="text-caption-12R text-opacity-black-80 relative z-10 cursor-pointer leading-[160%]">
                              {t}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex w-full items-center justify-between">
              <span className="text-body-14B text-[#111111]">몇 명이서 모일까요?</span>
              <div className="flex shrink-0 items-center gap-[8px]">
                {peopleLabels.map((label, index) => {
                  const isActive = activePeopleIndex === index;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActivePeopleIndex(index)}
                      className={`flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] border px-[8px] py-[2px] transition-colors ${
                        isActive
                          ? 'text-primary-blue-900 border-[#B8D4FE] bg-[#B8D4FE]'
                          : 'text-opacity-black-60 border-[#B8D4FE] bg-white'
                      }`}
                    >
                      <span className="text-body-14M">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 flex w-full items-center justify-between">
              <span className="text-body-14B text-[#111111]">얼마나 자주 모일까요?</span>
              <span className="text-body-14M text-opacity-black-80">1주일에 </span>
              <button type="button" onClick={handleDecrease} disabled={count === 1}>
                <img src={MinusIcon} alt="minus" className="h-6 w-6 cursor-pointer" />
              </button>
              <span className="text-body-14B min-w-[12px] text-center">{count}</span>
              <button type="button" onClick={handleIncrease} disabled={count === 7}>
                <img src={PlusIcon} alt="plus" className="h-6 w-6 cursor-pointer" />
              </button>
              <span className="text-body-14M text-opacity-black-80">회</span>
            </div>

            <Divider />
            <div className="mt-6 flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">활동 기간은 어떻게 되나요?</span>
              </div>
              <div className="mt-3 flex w-full gap-[12px]">
                <button
                  type="button"
                  onClick={() => setTarget('from')}
                  className={`flex flex-1 cursor-pointer flex-col items-center justify-center rounded-[12px] border px-[16px] py-[12px] transition-colors ${
                    target === 'from'
                      ? 'border-primary-blue-500 bg-primary-blue-100'
                      : 'border-[#B8D4FE] bg-white'
                  }`}
                >
                  <span className="text-caption-12M text-primary-blue-500">시작</span>
                  <span className="text-body-14M text-opacity-black-80">
                    {range.from ? formatKo(range.from) : '날짜 선택'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setTarget('to')}
                  className={`flex flex-1 cursor-pointer flex-col items-center justify-center rounded-[12px] border px-[16px] py-[12px] transition-colors ${
                    target === 'to'
                      ? 'border-primary-blue-500 bg-primary-blue-100'
                      : 'border-[#B8D4FE] bg-white'
                  }`}
                >
                  <span className="text-caption-12M text-primary-blue-500">종료</span>
                  <span className="text-body-14M text-text-opacity-black-80">
                    {range.to ? formatKo(range.to) : '날짜 선택'}
                  </span>
                </button>
              </div>

              <div className="animate-fade-in mt-4 flex flex-col gap-[13.73px]">
                <div className="flex flex-1 items-center justify-center gap-[8px]">
                  <button
                    onClick={handleMonthDown}
                    className={`${selectMonth ? 'text-primary-blue-300' : 'text-base-300'} cursor-pointer`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.45103 10.975C7.30103 11.075 7.1887 11.2 7.11403 11.35C7.03937 11.5 7.00137 11.6583 7.00003 11.825C6.9987 11.9917 7.03637 12.15 7.11303 12.3C7.1897 12.45 7.30203 12.575 7.45003 12.675L15.6 17.85C15.6834 17.9 15.771 17.9373 15.863 17.962C15.955 17.9867 16.0427 17.9993 16.126 18C16.3927 18 16.626 17.904 16.826 17.712C17.026 17.52 17.126 17.2827 17.126 17V6.65C17.126 6.36667 17.026 6.129 16.826 5.937C16.626 5.745 16.3927 5.64933 16.126 5.65C16.0427 5.65 15.9554 5.66267 15.864 5.688C15.7727 5.71333 15.685 5.75067 15.601 5.8L7.45103 10.975Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>

                  <p className="text-body-14B text-center text-[#111111CC]">
                    {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                  </p>

                  <button
                    onClick={handleMonthUp}
                    className="text-primary-blue-300 rotate-180 cursor-pointer"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.45103 10.975C7.30103 11.075 7.1887 11.2 7.11403 11.35C7.03937 11.5 7.00137 11.6583 7.00003 11.825C6.9987 11.9917 7.03637 12.15 7.11303 12.3C7.1897 12.45 7.30203 12.575 7.45003 12.675L15.6 17.85C15.6834 17.9 15.771 17.9373 15.863 17.962C15.955 17.9867 16.0427 17.9993 16.126 18C16.3927 18 16.626 17.904 16.826 17.712C17.026 17.52 17.126 17.2827 17.126 17V6.65C17.126 6.36667 17.026 6.129 16.826 5.937C16.626 5.745 16.3927 5.64933 16.126 5.65C16.0427 5.65 15.9554 5.66267 15.864 5.688C15.7727 5.71333 15.685 5.75067 15.601 5.8L7.45103 10.975Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <div className="border-primary-blue-200 grid h-[35px] grid-cols-7 items-center border-b-[0.8px]">
                  {week.map((day) => (
                    <div key={day} className="text-caption-12M text-primary-blue-500 text-center">
                      {day}
                    </div>
                  ))}
                </div>

                {/*클릭 */}
                <div className="grid grid-cols-7 gap-y-[12px]">
                  {calendarDays.map((item) => {
                    const isSelected =
                      item.currentMonth &&
                      selectedDate.getDate() === item.date &&
                      selectedDate.getMonth() === currentDate.getMonth();

                    return (
                      <div
                        key={item.id}
                        onClick={() =>
                          item.currentMonth &&
                          setSelectedDate(
                            new Date(currentDate.getFullYear(), currentDate.getMonth(), item.date),
                          )
                        }
                        className="flex cursor-pointer items-center justify-center"
                      >
                        <div
                          className={`text-caption-12M flex h-[32px] w-[32px] items-center justify-center ${!item.currentMonth ? 'text-base-300 opacity-40' : 'text-base-800'} ${isSelected ? 'bg-primary-blue-500 rounded-full text-white' : ''} `}
                        >
                          {item.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Divider />
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
            <div className="mt-6 flex w-full flex-col">
              <div className="flex items-center gap-2">
                <span className="text-body-14B text-[#111111]">
                  카카오톡 오픈채팅 링크를 입력해주세요.
                </span>
              </div>

              <input
                type="text"
                placeholder="입력하기"
                className="text-caption-12R focus:border-primary-blue-500 mt-2 w-full rounded-[8px] border border-[#B8D4FE] bg-white p-[8px] text-[#111111] placeholder:text-[rgba(17,17,17,0.4)] focus:outline-none"
              />
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="bg-primary-blue-500 flex h-[48px] w-full cursor-pointer items-center justify-center gap-[10px] self-stretch rounded-[8px] px-[61px] py-[12px] whitespace-nowrap"
              >
                <span className="text-body-16B text-center text-white">등록하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStudyPage;
