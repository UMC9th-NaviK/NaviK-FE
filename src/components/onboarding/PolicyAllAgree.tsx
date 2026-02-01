interface PolicyAllAgreeProps {
  checked: boolean;
  onToggle: () => void;
}

const PolicyAllAgree = ({ checked, onToggle }: PolicyAllAgreeProps) => (
  <button onClick={onToggle} className="border-b-base-200 flex items-center gap-2 border-b py-4">
    <div className="flex h-6 w-6 items-center justify-center rounded">
      <img
        src={checked ? '/icons/login/checked.svg' : '/icons/login/unchecked.svg'}
        alt={checked ? 'checked' : 'unchecked'}
        className="h-6 w-6"
      />
    </div>
    <p className="text-heading-18B text-primary-blue-500">전체 동의하기</p>
  </button>
);

export default PolicyAllAgree;
