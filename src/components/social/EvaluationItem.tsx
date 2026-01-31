interface EvaluationItemProps {
  index: number;
  text: string;
  variant: 'strength' | 'improvement';
}

export default function EvaluationItem({ index, text, variant }: EvaluationItemProps) {
  const colorClass = variant === 'strength' ? 'text-primary-blue-800' : 'text-primary-blue-500';

  return (
    <div className="border-primary-blue-100 flex w-full items-stretch gap-2.5 self-stretch rounded-lg border bg-white p-2">
      <span className={`text-body-14M ${colorClass}`}>{index}</span>
      <span className={`text-body-14M ${colorClass}`}>{text}</span>
    </div>
  );
}
