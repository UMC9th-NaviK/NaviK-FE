type SectionTitleProps = {
  emoji: string;
  title: string;
};

export default function EvaluationSectionTitle({ emoji, title }: SectionTitleProps) {
  return (
    <div className="mt-4 flex w-full items-center gap-1">
      <span>{emoji}</span>
      <span className="text-body-14B text-opacity-black-80">{title}</span>
    </div>
  );
}
