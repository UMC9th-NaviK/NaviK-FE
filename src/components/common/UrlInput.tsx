type UrlInputProps = {
  title: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const UrlInput = ({ title, placeholder, value, onChange }: UrlInputProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex w-18.5 gap-2">
        <img src="/icons/jobs/link.svg" className="h-5 w-5" alt="" />
        <p className="text-body-14M text-opacity-black-80">{title}</p>
      </div>
      <input
        type="url"
        pattern="https?://.+"
        className="border-base-300 text-caption-12M placeholder:text-opacity-black-20 text-primary-blue-500/80 flex-1 rounded-lg border px-3 py-2 focus:outline-none"
        placeholder={placeholder}
        inputMode="url"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
};

export default UrlInput;
