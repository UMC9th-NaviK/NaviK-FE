type CommentCard2Props = {
  author: string;
  authorMeta: string;
  content: string;
  timeAgo: string;
  profileSrc: string;
  deleteIconSrc?: string;
  enterIconSrc: string;
  onDelete?: () => void;
};

export default function CommentCard2({
  author,
  authorMeta,
  content,
  timeAgo,
  profileSrc,
  deleteIconSrc,
  enterIconSrc,
  onDelete,
}: CommentCard2Props) {
  const canDelete = typeof onDelete === 'function';

  return (
    <div className="flex w-full items-start gap-2">
      <img src={enterIconSrc} alt="답글 표시" className="mt-2 h-6 w-6 shrink-0"></img>
      <div className="flex flex-1 flex-col items-end gap-2 rounded-[8px] bg-[#F5F5F5] p-4">
        <div className="flex w-full items-start justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <img
              src={profileSrc}
              alt="프로필"
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="text-caption-12B text-[#111]">{author}</p>
              <p className="text-caption-12R text-[rgba(17,17,17,0.4)]">{authorMeta}</p>
            </div>
          </div>

          {canDelete && deleteIconSrc && (
            <button
              type="button"
              aria-label="댓글 삭제"
              className="h-5 w-5 shrink-0 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              <img src={deleteIconSrc} alt="댓글 삭제" className="h-5 w-5" />
            </button>
          )}
        </div>

        <p className="text-caption-12R text-opacity-black-80 mt-1 w-full whitespace-pre-line">
          {content}
        </p>

        <span className="text-caption-12R text-opacity-black-20">{timeAgo}</span>
      </div>
    </div>
  );
}
