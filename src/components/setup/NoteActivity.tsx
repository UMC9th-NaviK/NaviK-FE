import FileInputButton from './FileInputButton';
import { useState } from 'react';

interface NoteActivityProps {
  onInputChange: (hasInput: boolean) => void;
  onContentChange?: (content: string) => void;
  onFileChange?: (file: File | null) => void;
}

const NoteActivity = ({ onInputChange, onContentChange, onFileChange }: NoteActivityProps) => {
  const [inputMode, setInputMode] = useState<'none' | 'text' | 'file'>('none');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleTextModeClick = () => {
    if (inputMode === 'file') return; // 파일 모드일 때는 클릭 무시

    // 토글 동작
    if (inputMode === 'text') {
      setInputMode('none');
      setText('');
      onContentChange?.('');
      onInputChange(false);
    } else {
      setInputMode('text');
    }
  };

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);

    if (selectedFile) {
      setInputMode('file');
      setText(''); // 파일 선택 시 텍스트 초기화
      onContentChange?.('');
    } else {
      setInputMode('none');
    }

    onInputChange(!!selectedFile);
    onFileChange?.(selectedFile);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    onInputChange(!!value);
    onContentChange?.(value);
  };

  return (
    <div className="flex flex-col">
      <p className="text-heading-20B text-base-900 flex">나의 경험 기록하기</p>
      <p className="text-body-14M text-opacity-black-60">
        나의 활동을 작성하고, AI 분석을 진행해봐요!
      </p>
      <p className="text-primary-blue-500 text-caption-10M pb-4">
        * 입력 또는 PDF 파일 추가만 가능해요.
      </p>
      <div className="shadow-card bg-base-100 text-body-14M shadow-card flex flex-col gap-4 rounded-2xl p-4">
        {/* 활동 직접 입력 버튼 */}
        <button
          onClick={handleTextModeClick}
          disabled={inputMode === 'file'}
          className={`flex justify-between rounded-lg border px-4 py-3 transition-colors ${
            inputMode === 'file'
              ? 'border-base-300 bg-base-200 cursor-not-allowed opacity-50'
              : inputMode === 'text'
                ? 'border-primary-blue-500 bg-primary-blue-50'
                : 'border-primary-blue-100 bg-base-100'
          }`}
        >
          <div className="flex gap-2">
            <img
              src={`/icons/jobs/${inputMode === 'text' ? 'edit-blue' : 'edit'}.svg`}
              alt="edit"
              aria-hidden="true"
            />
            <p
              className={`text-body-14R ${
                inputMode === 'text' ? 'text-primary-blue-500' : 'text-base-600'
              }`}
            >
              {inputMode === 'text' ? '나의 활동을 입력해주세요.' : '활동 직접 입력'}
            </p>
          </div>
          <img
            src={`/icons/jobs/arrow.svg`}
            alt=""
            aria-hidden="true"
            className={`transition-transform duration-300 ${
              inputMode === 'text' ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        {/* 텍스트 입력 영역 - text 모드일 때만 표시 */}
        {inputMode === 'text' && (
          <textarea
            aria-label="나의 경험 기록하기"
            className="bg-base-100 text-body-14R placeholder:text-opacity-black-40 text-opacity-black-80 min-h-55 resize-none overflow-y-auto p-4 focus:outline-none"
            value={text}
            onChange={handleTextChange}
            placeholder="나의 활동을 입력해주세요."
            autoFocus
          />
        )}

        {/* PDF 파일 추가 버튼 */}
        <FileInputButton
          onFileChange={handleFileChange}
          disabled={inputMode === 'text'}
          file={file}
        />
      </div>
    </div>
  );
};

export default NoteActivity;
