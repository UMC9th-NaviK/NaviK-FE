import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import BackIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded.svg';
import BoardEditHeader from '../../components/social/board/edit/BoardEditHeader';
import { updateBoard } from '../../apis/board';
type EditState = { title?: string; content?: string };

const BoardEditPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const location = useLocation();
  const editState = location.state as EditState | null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  //초기값 세팅(BoardDetailPage에서 state로 넘긴 값)
  useEffect(() => {
    setTitle(editState?.title ?? '');
    setContent(editState?.content ?? '');
  }, [editState]);

  const onSubmit = async () => {
    if (!boardId || saving) return;

    const articleTitle = title.trim();
    const articleContent = content.trim();

    if (!articleTitle || !articleContent) return;

    try {
      setSaving(true);

      const res = await updateBoard(Number(boardId), { articleTitle, articleContent });

      if (!res.data?.isSuccess) {
        console.warn(res.data?.message ?? '게시글 수정 실패');
        return;
      }

      navigate(`/social/board/${boardId}`, { state: { refresh: true }, replace: true });
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }
  useEffect(() => {
    autoResize();
  }, [content]);

  return (
    <div className="min-h-screen">
      <BoardEditHeader BackIcon={BackIcon} title="게시글 수정" onDone={onSubmit} />
      <div className="px-6">
        <div className="border-base-200 flex w-full items-center justify-center gap-2.5 self-stretch border-b py-4">
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-heading-18B text-base-900 placeholder:text-base-400 flex flex-1 border-none bg-transparent outline-none"
          />
        </div>
        <textarea
          ref={textareaRef}
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onInput={autoResize}
          className="text-body-14R text-opacity-black-80 placeholder:text-base-400 mt-4 w-full resize-none overflow-hidden border-none bg-transparent whitespace-pre-line outline-none"
          rows={1}
        />
      </div>
    </div>
  );
};

export default BoardEditPage;
