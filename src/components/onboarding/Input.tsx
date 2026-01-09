type InputProps = {
  title: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ title, placeholder, value, onChange }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-heading-18B">{title}</p>
      <input
        className="text-body-14M border-primary-blue-500 placeholder:text-opacity-black-40 focus:border-primary-blue-500 rounded-lg border px-4 py-3.5 focus:ring-0 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
