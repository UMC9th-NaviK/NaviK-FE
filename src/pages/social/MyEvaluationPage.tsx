import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded.svg';
import ClickIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded (1).svg';
import { useState } from 'react';
import CalendarIcon from '../../assets/social/material-symbols_calendar-today-rounded.svg';
import PersonIcon from '../../assets/social/material-symbols_person-rounded.svg';
import FullStar from '../../assets/social/material-symbols_star-rounded.svg';
import EmptyStar from '../../assets/social/material-symbols_star-outline-rounded.svg';
type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

type TagChipProps = {
  label: string;
  variant?: 'gray' | 'red';
};

const TagChip = ({ label, variant = 'gray' }: TagChipProps) => {
  const base = 'flex items-center justify-center px-2 py-1 text-[12px] font-medium';

  const gray =
    'rounded-lg border border-[#E3E3E3] bg-[rgba(227,227,227,0.5)]  text-caption-12M text-[rgba(17,17,17,0.6)] leading-[140%]';

  const red =
    'rounded-full -rotate-[0.015deg] border border-[rgba(231,35,38,0.1)] bg-[rgba(231,35,38,0.1)] text-caption-12M text-[#E72326] leading-[140%]';

  return <span className={`${base} ${variant === 'red' ? red : gray}`}>{label}</span>;
};

const PeriodRow = () => {
  return (
    <div className="flex w-full items-start gap-2">
      <img src={CalendarIcon} alt="" className="mt-[3px] h-4 w-4" />
      <span className="w-[56px] text-[14px] leading-[160%] font-bold tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        진행기간d
      </span>
      <span className="flex-1 text-[14px] leading-[160%] font-normal tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        2025년 4월 10일 ~ 7월 10일
      </span>
    </div>
  );
};
const MemberRow = () => {
  return (
    <div className="flex w-full items-start gap-2">
      <img src={PersonIcon} alt="" className="mt-[3px] h-4 w-4" />

      <span className="w-[56px] text-[14px] leading-[160%] font-bold tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        인원
      </span>

      <span className="flex-1 text-[14px] leading-[160%] font-normal tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        6명
      </span>
    </div>
  );
};

type SectionTitleProps = {
  emoji: string;
  title: string;
};
const EvaluationSectionTitle = ({ emoji, title }: SectionTitleProps) => {
  return (
    <div className="flex w-full items-center gap-2">
      <span>{emoji}</span>
      <span className="text-body-14B leading-[160%] tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        {title}
      </span>
    </div>
  );
};

type EvaluationListProps = {
  items: string[];
};
const EvaluationList = ({ items }: EvaluationListProps) => {
  return (
    <ul className="flex w-full list-disc flex-col gap-2 pl-5">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="text-body-14R leading-[160%] tracking-[-0.14px] text-[rgba(17,17,17,0.8)] opacity-60"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
function BlueAccordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`bg-primary-blue-500 flex h-12 w-full -rotate-[0.015deg] cursor-pointer items-center justify-between px-3 py-2 ${open ? 'rounded-t-lg' : 'rounded-lg'} `}
      >
        <span className="text-body-16B text-white">{title}</span>

        <img
          src={ClickIcon}
          alt="toggle"
          className={`h-4 w-4 transition-transform duration-200 ease-out ${open ? 'rotate-90' : 'rotate-0'} `}
        />
      </button>

      {/* Body */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} `}
      >
        <div className="flex w-full flex-col items-start gap-4 self-stretch rounded-b-lg border border-[#DBEBFE] px-3 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
const Divider = () => {
  return <div className="my-2 h-px w-full bg-[#DBEBFE]" />;
};

type SummaryProps = {
  comment: string;
};

const EvaluationSummary = ({ comment }: SummaryProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-body-16B leading-[140%] tracking-[-0.32px] text-[rgba(17,17,17,0.8)]">
        📌 총평
      </span>
      <p className="text-body-14M leading-[140%] tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        {comment}
      </p>
    </div>
  );
};

type StarRatingProps = {
  rating: number;
  max?: number;
};

const StarRating = ({ rating, max = 5 }: StarRatingProps) => {
  const filledCount = Math.floor(rating);

  return (
    <div className="flex w-full items-center">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: max }).map((_, idx) => (
            <img
              key={idx}
              src={idx < filledCount ? FullStar : EmptyStar}
              alt=""
              className="h-6 w-6"
            />
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-body-14B leading-[160%] tracking-[-0.14px] text-[#4E83F9]">
            {rating}
          </span>
          <span className="text-body-14B leading-[160%] tracking-[-0.14px] text-[rgba(17,17,17,0.4)]">
            /
          </span>
          <span className="text-body-14B leading-[160%] tracking-[-0.14px] text-[rgba(17,17,17,0.4)]">
            {max}
          </span>
        </div>
      </div>
    </div>
  );
};
const MyEvaluationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-50 min-h-dvh">
      {/* Header */}
      <div className="flex w-full flex-col gap-[10px] self-stretch bg-white px-6 py-6">
        <div className="relative flex items-center">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center"
          >
            <img src={BackIcon} alt="" className="h-5 w-5" />
          </button>

          <h1 className="text-heading-20B text-base-900 absolute left-1/2 -translate-x-1/2">
            내가 받은 평가
          </h1>
        </div>
      </div>

      <div className="flex items-start justify-center gap-[10px] self-stretch bg-blue-50 p-4">
        <div className="w-full max-w-[430px]">
          <p className="text-body-16B text-base-900">스터디별 평가 요약을 모아봤어요!</p>

          <div className="mt-4 flex w-full flex-col gap-4 rounded-2xl border border-white bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]">
            <BlueAccordion title="[백엔드 포트폴리오 리뷰 스터디]">
              <PeriodRow />
              <MemberRow />
              <div className="flex w-full flex-wrap gap-2">
                <TagChip label="비대면" />
                <TagChip label="이틀에 1회" />
                <TagChip label="종료" variant="red" />
              </div>
              <EvaluationSectionTitle emoji="☺️" title="동료들이 평가한 나의 강점" />
              <EvaluationList
                items={[
                  '의견을 정리해서 공유해주는 점이 좋았어요.',
                  '과제 준비가 항상 꼼꼼했어요.',
                  '팀 분위기를 부드럽게 만들어줘요.',
                ]}
              />
              <EvaluationSectionTitle emoji="🙁" title="동료들이 평가한 나의 약점" />
              <EvaluationList
                items={[
                  '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
                  '의견을 더 적극적으로 내면 좋을 것 같아요.',
                ]}
              />
              <Divider />
              <EvaluationSummary comment="발표를 더 많이 해보면 좋을 것 같아요!" />
              <StarRating rating={4.3} />
            </BlueAccordion>
            <BlueAccordion title="[알고리즘 스터디]">
              <PeriodRow />
              <MemberRow />
              <div className="flex w-full flex-wrap gap-2">
                <TagChip label="비대면" />
                <TagChip label="이틀에 1회" />
                <TagChip label="종료" variant="red" />
              </div>
              <EvaluationSectionTitle emoji="☺️" title="동료들이 평가한 나의 강점" />
              <EvaluationList
                items={[
                  '의견을 정리해서 공유해주는 점이 좋았어요.',
                  '과제 준비가 항상 꼼꼼했어요.',
                  '팀 분위기를 부드럽게 만들어줘요.',
                ]}
              />
              <EvaluationSectionTitle emoji="🙁" title="동료들이 평가한 나의 약점" />
              <EvaluationList
                items={[
                  '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
                  '의견을 더 적극적으로 내면 좋을 것 같아요.',
                ]}
              />
              <Divider />
              <EvaluationSummary comment="발표를 더 많이 해보면 좋을 것 같아요!" />
              <StarRating rating={4.3} />
            </BlueAccordion>
            <BlueAccordion title="[실전 DB 구조 설계 스터디]">
              <PeriodRow />
              <MemberRow />
              <div className="flex w-full flex-wrap gap-2">
                <TagChip label="비대면" />
                <TagChip label="이틀에 1회" />
                <TagChip label="종료" variant="red" />
              </div>
              <EvaluationSectionTitle emoji="☺️" title="동료들이 평가한 나의 강점" />
              <EvaluationList
                items={[
                  '의견을 정리해서 공유해주는 점이 좋았어요.',
                  '과제 준비가 항상 꼼꼼했어요.',
                  '팀 분위기를 부드럽게 만들어줘요.',
                ]}
              />
              <EvaluationSectionTitle emoji="🙁" title="동료들이 평가한 나의 약점" />
              <EvaluationList
                items={[
                  '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
                  '의견을 더 적극적으로 내면 좋을 것 같아요.',
                ]}
              />
              <Divider />
              <EvaluationSummary comment="발표를 더 많이 해보면 좋을 것 같아요!" />
              <StarRating rating={4.3} />
            </BlueAccordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvaluationPage;
