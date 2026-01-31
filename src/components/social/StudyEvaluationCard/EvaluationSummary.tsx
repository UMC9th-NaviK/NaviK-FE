type SummaryProps = {
  comment: string;
};

export default function EvaluationSummary({ comment }: SummaryProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-body-16B leading-[140%] tracking-[-0.32px] text-[rgba(17,17,17,0.8)]">
        📌 조언 및 별점 총평
      </span>
      <p className="text-body-14M leading-[140%] tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        {comment}
      </p>
    </div>
  );
}
