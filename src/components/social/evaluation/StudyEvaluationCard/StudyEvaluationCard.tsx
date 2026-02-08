import TagChip from '../../../common/TagChip';
import Divider from '../../../common/Divider';
import StarRating from '../../../common/StarRating';
import BlueAccordion from './BlueAccordion';
import InfoRow from './InfoRow';
import EvaluationSectionTitle from './EvaluationSectionTitle';
import EvaluationList from './EvaluationList';
import EvaluationSummary from './EvaluationSummary';

type StudyEvaluationCardProps = {
  title: string;
  periodText: string;
  memberText: string;
  tags: { label: string; variant?: 'gray' | 'red' }[];
  strengths: string[];
  improvements: string[];
  summary: string;
  rating: number;
};

export default function StudyEvaluationCard({
  title,
  periodText,
  memberText,
  tags,
  strengths,
  improvements,
  summary,
  rating,
}: StudyEvaluationCardProps) {
  return (
    <BlueAccordion title={title}>
      <InfoRow icon="calendar" label="진행기간" value={periodText} />
      <InfoRow icon="person" label="인원" value={memberText} />
      <div className="mt-2 flex w-full flex-wrap gap-2">
        {tags.map((t, idx) => (
          <TagChip key={`${t.label}-${idx}`} label={t.label} variant={t.variant} />
        ))}
      </div>
      <EvaluationSectionTitle emoji="☺️" title="동료들이 평가한 나의 강점" />
      <EvaluationList items={strengths} />
      <EvaluationSectionTitle emoji="🙁" title="동료들이 평가한 나의 약점" />
      <EvaluationList items={improvements} />

      <Divider />
      <EvaluationSummary comment={summary} />
      <StarRating rating={rating} />
    </BlueAccordion>
  );
}
