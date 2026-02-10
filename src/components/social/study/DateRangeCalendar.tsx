import type { DateRange } from 'react-day-picker';

type CalendarDay = { date: number; currentMonth: boolean; id: string };

type Props = {
  range: DateRange;
  onDayClick: (day: Date) => void;
  formatKo: (d?: Date) => string;

  currentDate: Date;
  onMonthDown: () => void;
  onMonthUp: () => void;
  selectMonth: boolean;

  week: string[];
  calendarDays: CalendarDay[];

  isSameDay: (a?: Date, b?: Date) => boolean;
  isBetween: (d: Date, from?: Date, to?: Date) => boolean;
};

export default function DateRangeCalendar({
  range,
  onDayClick,
  formatKo,
  currentDate,
  onMonthDown,
  onMonthUp,
  selectMonth,
  week,
  calendarDays,
  isSameDay,
  isBetween,
}: Props) {
  return (
    <div className="mt-6 flex w-full flex-col">
      <div className="flex items-center gap-2">
        <span className="text-body-14B text-[#111111]">활동 기간은 어떻게 되나요?</span>
      </div>

      <div className="mt-3 flex w-full gap-[12px]">
        <div className="border-primary-blue-200 flex flex-1 flex-col items-center justify-center rounded-[12px] border bg-white px-[16px] py-[12px]">
          <span className="text-caption-12M text-primary-blue-500">시작</span>
          <span className="text-body-14M text-opacity-black-80">
            {range.from ? formatKo(range.from) : '날짜 선택'}
          </span>
        </div>

        <div className="border-primary-blue-200 flex flex-1 flex-col items-center justify-center rounded-[12px] border bg-white px-[16px] py-[12px]">
          <span className="text-caption-12M text-primary-blue-500">종료</span>
          <span className="text-body-14M text-opacity-black-80">
            {range.to ? formatKo(range.to) : '날짜 선택'}
          </span>
        </div>
      </div>

      <div className="animate-fade-in mt-4 flex flex-col gap-[13.73px]">
        <div className="flex flex-1 items-center justify-center gap-[8px]">
          <button
            onClick={onMonthDown}
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

          <button onClick={onMonthUp} className="text-primary-blue-300 rotate-180 cursor-pointer">
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

        <div className="grid grid-cols-7 gap-y-[12px]">
          {calendarDays.map((item) => {
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), item.date);

            const isStart = item.currentMonth && isSameDay(dayDate, range.from);
            const isEnd = item.currentMonth && isSameDay(dayDate, range.to);
            const inRange = item.currentMonth && isBetween(dayDate, range.from, range.to);
            const isRange = item.currentMonth && (isStart || isEnd || inRange);

            return (
              <div
                key={item.id}
                onClick={() => item.currentMonth && onDayClick(dayDate)}
                className="relative flex h-[32px] cursor-pointer items-center justify-center"
              >
                {isRange && (
                  <div
                    className={[
                      'bg-primary-blue-100 absolute top-1/2 right-0 left-0 h-[32px] -translate-y-1/2',
                      isStart && 'rounded-l-full',
                      isEnd && 'rounded-r-full',
                      range.from && !range.to && (isStart ? 'hidden' : ''),
                    ].join(' ')}
                  />
                )}

                <div
                  className={[
                    'text-caption-12M relative z-10 flex h-[32px] w-[32px] items-center justify-center',
                    !item.currentMonth ? 'text-base-300 opacity-40' : 'text-base-800',
                    isStart || isEnd ? 'bg-primary-blue-500 rounded-full text-white' : '',
                  ].join(' ')}
                >
                  {item.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
