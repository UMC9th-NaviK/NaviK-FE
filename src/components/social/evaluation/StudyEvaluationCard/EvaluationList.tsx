type EvaluationListProps = {
  items: string[];
};

export default function EvaluationList({ items }: EvaluationListProps) {
  return (
    <ul className="mt-1 flex w-full list-disc flex-col pl-5">
      {items.map((item, idx) => (
        <li key={idx} className="text-body-14R text-opacity-black-60">
          {item}
        </li>
      ))}
    </ul>
  );
}
