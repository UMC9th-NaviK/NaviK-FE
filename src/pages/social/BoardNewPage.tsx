import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import BackIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded.svg';
import BoardNewHeader from '../../components/social/board/BoardNewHeader';
import { createBoard } from '../../apis/board';
type EditState = { title?: string; content?: string };
const BoardNewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as EditState) ?? {};

  const [title, setTitle] = useState(state.title ?? '');
  const [content, setContent] = useState(state.content ?? '');
  const [submitting, setSubmitting] = useState(false);

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

  const onDone = async () => {
    if (!title.trim() || !content.trim()) return;
    if (submitting) return;

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      setSubmitting(true);

      const res = await createBoard({ articleTitle: title.trim(), articleContent: content.trim() });

      if (!res.data?.isSuccess) {
        console.error('[BoardNewPage] create failed:', res.data);
        return;
      }

      navigate('/social/board', { state: { refresh: true }, replace: true });
    } catch (e) {
      console.error('[BoardNewPage] create error:', e);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen">
      <BoardNewHeader BackIcon={BackIcon} title="게시글 작성" onDone={onDone} />
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

export default BoardNewPage;
