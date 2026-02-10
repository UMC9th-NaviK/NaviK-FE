import { EvaluationAccordion, type EvaluationItem } from './EvaluationAccordion';

interface TagSectionProps {
  title: string;
  tags: string[];
  sections: EvaluationItem[];
  onToggle: (item: string) => void;
  errorItem: string | null;
}

export const TagSection = ({ title, tags, sections, onToggle, errorItem }: TagSectionProps) => (
  <section className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-heading-18B text-base-900 font-bold">{title}</span>
        <span className="text-body-16M text-base-400 font-medium">{tags.length}/5</span>
      </div>
      <span className="text-caption-12M text-[#E72326]">필수</span>
    </div>
    <div className="flex flex-col gap-3">
      {sections.map((cat) => (
        <EvaluationAccordion
          key={cat.id}
          category={cat}
          selectedItems={tags}
          onToggleItem={onToggle}
          errorItem={errorItem}
        />
      ))}
    </div>
  </section>
);
