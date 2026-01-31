type EvaluationListProps = {
  items: string[];
};

export default function EvaluationList({ items }: EvaluationListProps) {
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
}
