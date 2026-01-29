import React, { useRef, useState } from 'react';

const FileInputButton = () => {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploaded(true);
      setFileName(file.name);
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />
      <button
        type="button"
        onClick={handleButtonClick}
        className={`flex w-full gap-2 rounded-lg border p-4 ${uploaded ? 'bg-white-background justify-start border-0' : 'border-base-400 justify-center border-dashed bg-[#F5F5F580]'} `}
      >
        <img src={`/icons/jobs/${uploaded ? 'folder-up' : 'folder'}.svg`} />
        <p className={`text-body-14R ${uploaded ? 'text-opacity-black-80' : 'text-base-400'}`}>
          {uploaded ? fileName : 'PDF 파일 추가'}
        </p>
      </button>
    </div>
  );
};

export default FileInputButton;
