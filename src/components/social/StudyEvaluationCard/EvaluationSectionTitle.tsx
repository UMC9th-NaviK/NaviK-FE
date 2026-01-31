type SectionTitleProps = {
  emoji: string;
  title: string;
};

export default function EvaluationSectionTitle({ emoji, title }: SectionTitleProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <span>{emoji}</span>
      <span className="text-body-14B leading-[160%] tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        {title}
      </span>
    </div>
  );
}
