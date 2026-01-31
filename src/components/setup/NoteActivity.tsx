import FileInputButton from './FileInputButton';

import { useState } from 'react';

interface NoteActivityProps {
  onInputChange: (hasInput: boolean) => void;
}

const NoteActivity = ({ onInputChange }: NoteActivityProps) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    onInputChange(!!text || !!selectedFile);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    onInputChange(!!value || !!file);
  };

  return (
    <div className="flex flex-col">
      <p className="text-heading-20B text-base-900 flex">나의 경험 기록하기</p>
      <p className="text-body-14M text-opacity-black-60 pb-4">
        나의 활동을 작성하고, AI 분석을 진행해봐요!
      </p>
      <div className="shadow-card bg-base-100 text-body-14M shadow-card flex flex-col gap-6 rounded-2xl p-4">
        {/* 높이 지정 */}
        <textarea
          className="border-primary-blue-300 bg-base-100 text-body-14R placeholder:text-opacity-black-40 text-opacity-black-80 min-h-55 resize-none overflow-y-auto rounded-lg border p-4 focus:outline-none"
          value={text}
          onChange={handleTextChange}
        />
        <FileInputButton onFileChange={handleFileChange} />
      </div>
    </div>
  );
};

export default NoteActivity;
