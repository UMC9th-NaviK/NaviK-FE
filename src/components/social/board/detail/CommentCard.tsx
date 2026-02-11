type CommentCardProps = {
  author: string;
  authorMeta: string;
  content: string;
  timeAgo: string;
  profileSrc: string;
  addIconSrc: string;
  deleteIconSrc?: string;
  onAdd?: () => void;
  onDelete?: () => void;
};

export default function CommentCard({
  author,
  authorMeta,
  content,
  timeAgo,
  profileSrc,
  addIconSrc,
  deleteIconSrc,
  onAdd,
  onDelete,
}: CommentCardProps) {
  const canDelete = typeof onDelete === 'function';

  return (
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

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="댓글 추가"
            className="h-5 w-5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onAdd?.();
            }}
          >
            <img src={addIconSrc} alt="댓글 추가" className="h-5 w-5" />
          </button>

          {canDelete && deleteIconSrc && (
            <button
              type="button"
              aria-label="댓글 삭제"
              className="h-5 w-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              <img src={deleteIconSrc} alt="댓글 삭제" className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <p className="text-caption-12R mt-4 whitespace-pre-line text-[rgba(17,17,17,0.8)]">
        {content}
      </p>

      <div className="flex w-full justify-end">
        <span className="text-caption-12M shrink-0 text-[rgba(17,17,17,0.2)]">{timeAgo}</span>
      </div>
    </div>
  );
}
