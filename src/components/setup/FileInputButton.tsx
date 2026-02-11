import React, { useRef } from 'react';

interface FileInputButtonProps {
  onFileChange?: (file: File | null) => void;
  disabled?: boolean;
  file?: File | null;
}

const FileInputButton = ({ onFileChange, disabled, file }: FileInputButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      onFileChange?.(null);
      return;
    }

    const isPdf =
      selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      alert('PDF 파일만 업로드할 수 있습니다.');
      e.target.value = '';
      onFileChange?.(null);
      return;
    }

    onFileChange?.(selectedFile);
  };

  const uploaded = !!file;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={disabled}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border px-4 py-3 transition-colors ${
          disabled
            ? 'border-base-300 bg-base-200 cursor-not-allowed opacity-50'
            : uploaded
              ? 'bg-white-background border-0'
              : 'border-base-400 border-dashed bg-[#F5F5F550]'
        }`}
      >
        <div className="flex items-center gap-2">
          <img
            src={`/icons/jobs/${uploaded ? 'folder-up' : 'folder'}.svg`}
            alt={uploaded ? 'folder up' : 'folder'}
            aria-hidden="true"
          />
          <p className={`text-body-14R ${uploaded ? 'text-opacity-black-80' : 'text-base-600'}`}>
            {uploaded ? file.name : 'PDF 파일 추가'}
          </p>
        </div>
      </button>
    </div>
  );
};

export default FileInputButton;
