type Props = {
  author: string;
  authorMeta: string;
  profileSrc: string;
  value: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  enterIconSrc?: string;
};

export default function CommentEditor({
  author,
  authorMeta,
  profileSrc,
  value,
  onChange,
  onCancel,
  onSubmit,
  enterIconSrc,
}: Props) {
  return (
    <article className="border-primary-blue-500 mt-4 flex w-full flex-col items-start gap-[10px] self-stretch rounded-[8px] border bg-white p-4">
      <div className="w-full rounded-2xl bg-white">
        <div className="flex w-full items-start justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <img
              src={profileSrc}
              alt="프로필"
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-body-14B text-[#111]">{author}</p>
              <p className="text-caption-12R text-[rgba(17,17,17,0.4)]">{authorMeta}</p>
            </div>
          </div>

          {enterIconSrc ? <img src={enterIconSrc} alt="" className="h-5 w-5" /> : null}
        </div>

        <textarea
          placeholder="댓글을 입력해주세요"
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onInput={(e) => {
            const target = e.currentTarget;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
          className="text-caption-12R placeholder:text-opacity-black-40 mt-4 w-full resize-none overflow-hidden rounded-[7px] border border-[0.5px] border-[#D6D6D6] bg-white px-3 py-[11px] text-[#111] outline-none"
        />
      </div>

      <div className="flex w-full justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-body-14M flex h-[38px] cursor-pointer items-center justify-center gap-2.5 rounded-[8px] bg-[#E3E3E3] px-6 py-2 text-[#111]"
        >
          취소
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="text-body-14M bg-primary-blue-500 flex h-[38px] cursor-pointer items-center justify-center gap-2.5 rounded-[8px] px-6 py-2 text-white"
        >
          등록
        </button>
      </div>
    </article>
  );
}
