type Props = {
  liked: boolean;
  likeCount: number;
  commentCount: number;

  FavoriteIcon: string;
  FavoriteIcon2: string;
  MessageIcon: string;

  onToggleLike: () => void;
  onClickComment?: () => void;
};

export default function ReactionBar({
  liked,
  likeCount,
  commentCount,
  FavoriteIcon,
  FavoriteIcon2,
  MessageIcon,
  onToggleLike,
  onClickComment,
}: Props) {
  return (
    <div className="mt-4 flex w-full items-center gap-[13px] self-stretch">
      <button
        type="button"
        onClick={onToggleLike}
        className="flex cursor-pointer items-center gap-2"
      >
        <img
          src={liked ? FavoriteIcon2 : FavoriteIcon}
          alt="좋아요"
          className="aspect-square h-4 w-4"
        />
        <span className="text-caption-12M text-opacity-black-40 leading-[16px]">{likeCount}</span>
      </button>

      <button
        type="button"
        onClick={onClickComment}
        className="flex cursor-pointer items-center gap-2"
      >
        <img src={MessageIcon} alt="댓글" className="aspect-square h-4 w-4" />
        <span className="text-caption-12M text-opacity-black-40 leading-[16px]">
          {commentCount}
        </span>
      </button>
    </div>
  );
}
