type TagChipProps = {
  label: string;
  variant?: 'gray' | 'red';
};

export default function TagChip({ label, variant = 'gray' }: TagChipProps) {
  const base = 'flex items-center justify-center px-2 py-1 text-[12px] font-medium';

  const gray =
    'rounded-lg border border-[#E3E3E3] bg-[rgba(227,227,227,0.5)] text-caption-12M text-[rgba(17,17,17,0.6)] leading-[140%]';

  const red =
    'rounded-full -rotate-[0.015deg] border border-[rgba(231,35,38,0.1)] bg-[rgba(231,35,38,0.1)] text-caption-12M text-[#E72326] leading-[140%]';

  return <span className={`${base} ${variant === 'red' ? red : gray}`}>{label}</span>;
}
