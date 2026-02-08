type SummaryProps = {
  comment: string;
};

export default function EvaluationSummary({ comment }: SummaryProps) {
  return (
    <div className="mt-2 flex w-full flex-col gap-1">
      <span className="text-body-16B text-opacity-black-80">📌 &nbsp; 조언 및 별점 총평</span>
      <p className="text-body-14M text-opacity-black-80">"{comment}"</p>
    </div>
  );
}
