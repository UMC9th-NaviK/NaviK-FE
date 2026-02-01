interface PolicyItemProps {
  id: string;
  title: string;
  checked: boolean;
  onToggle: (id: string) => void;
  onView: (id: string) => void;
}

const PolicyItem = ({ id, title, checked, onToggle, onView }: PolicyItemProps) => {
  return (
    <div className="flex items-center gap-2 py-3">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded"
      >
        <img
          src={checked ? '/icons/login/checked.svg' : '/icons/login/unchecked.svg'}
          alt={checked ? 'checked' : 'unchecked'}
          className="h-6 w-6"
        />
      </button>

      <span className="flex w-full items-center justify-between">
        <p className="text-body-16M text-opacity-black-60 flex items-center gap-1">
          {title}
          <span className="text-opacity-black-40">(필수)</span>
        </p>
        <button
          type="button"
          onClick={() => onView(id)}
          className="text-body-14R text-opacity-black-60 flex items-center"
        >
          <p>보기</p>
          <img src="/icons/login/gray-arrow.svg" alt="arrow" className="inline-block h-4 w-4" />
        </button>
      </span>
    </div>
  );
};

export default PolicyItem;
