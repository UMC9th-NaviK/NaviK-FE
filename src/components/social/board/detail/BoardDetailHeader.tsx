import { useNavigate } from 'react-router-dom';

type Props = {
  title?: string;
  BackIcon: string;
};

export default function BoardDetailHeader({ title = '게시글 상세', BackIcon }: Props) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-white px-6">
      <div className="relative flex items-center justify-center p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-base-900 absolute left-0"
          aria-label="뒤로가기"
          type="button"
        >
          <img src={BackIcon} alt="" className="h-5 w-5 cursor-pointer" />
        </button>
        <h1 className="text-heading-20B text-base-900">{title}</h1>
      </div>
    </div>
  );
}
