import PostOptionsMenu from './PostOptionsMenu';

type Props = {
  timeAgo: string;
  viewCount: number;

  MoreIcon?: string;
  EditIcon?: string;
  DeleteIcon?: string;

  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PostMetaRow({
  timeAgo,
  viewCount,
  MoreIcon,
  EditIcon,
  DeleteIcon,
  onEdit,
  onDelete,
}: Props) {
  const showMenu = !!(MoreIcon && EditIcon && DeleteIcon && onEdit && onDelete);

  return (
    <div className="mt-4 flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-caption-12M text-opacity-black-60">
          작성 &nbsp;<span className="text-caption-12R text-opacity-black-40">{timeAgo}</span>
        </span>

        <span className="text-caption-12M text-opacity-black-60">
          조회 &nbsp;<span className="text-caption-12R text-opacity-black-40">{viewCount}</span>
        </span>
      </div>

      {showMenu && (
        <PostOptionsMenu
          MoreIcon={MoreIcon}
          EditIcon={EditIcon}
          DeleteIcon={DeleteIcon}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
