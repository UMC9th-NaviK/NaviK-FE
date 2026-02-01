import React, { useRef, useState } from 'react';

interface FileInputButtonProps {
  onFileChange?: (file: File | null) => void;
}

const FileInputButton = ({ onFileChange }: FileInputButtonProps) => {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setUploaded(false);
      setFileName('');
      onFileChange?.(null);
      return;
    }
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      alert('PDF 파일만 업로드할 수 있습니다.');
      e.target.value = '';
      setUploaded(false);
      setFileName('');
      onFileChange?.(null);
      return;
    }
    setUploaded(true);
    setFileName(file.name);
    onFileChange?.(file);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className={`flex w-full gap-2 rounded-lg border p-4 ${uploaded ? 'bg-white-background justify-start border-0' : 'border-base-400 justify-center border-dashed bg-[#F5F5F580]'} `}
      >
        <img
          src={`/icons/jobs/${uploaded ? 'folder-up' : 'folder'}.svg`}
          alt={uploaded ? 'folder up' : 'folder'}
          aria-hidden="true"
        />
        <p className={`text-body-14R ${uploaded ? 'text-opacity-black-80' : 'text-base-400'}`}>
          {uploaded ? fileName : 'PDF 파일 추가'}
        </p>
      </button>
    </div>
  );
};

export default FileInputButton;
