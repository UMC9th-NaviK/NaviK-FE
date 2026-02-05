import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { MOCK_POSTS } from '../../mocks/social/boardPosts';
import FavoriteIcon from '../../assets/social/material-symbols_favorite-outline-rounded.svg';
import FavoriteIcon2 from '../../assets/social/material-symbols_favorite-rounded.svg';
import ProfileIcon from '../../assets/social/Ellipse 30.svg';
import BackIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded.svg';
import MoreIcon from '../../assets/social/material-symbols_more-horiz.svg';
import MessageIcon from '../../assets/social/majesticons_chat-2-line.svg';
import DeleteIcon from '../../assets/social/material-symbols_delete-forever-rounded.svg';
import EditIcon from '../../assets/social/material-symbols_edit-outline.svg';
import AddIcon from '../../assets/social/material-symbols_add-comment-outline-rounded.svg';
import DeleteIcon2 from '../../assets/social/material-symbols_delete-outline-rounded.svg';
import BoardDetailHeader from '../../components/social/board/detail/BoardDetailHeader';
import AuthorCard from '../../components/social/board/detail/AuthorCard';
import PostMetaRow from '../../components/social/board/detail/PostMetaRow';
import ReactionBar from '../../components/social/board/detail/ReactionBar';
import CommentCard from '../../components/social/board/detail/CommentCard';
import CommentCard2 from '../../components/social/board/detail/CommentCard2';
import CommentEditor from '../../components/social/board/detail/CommentEditor';
import enterIcon from '../../assets/social/material-symbols_delete-outline-rounded (1).svg';

type EditState = {
  title?: string;
  content?: string;
};
type Reply = {
  id: string;
  author: string;
  authorMeta: string;
  content: string;
  timeAgo: string;
};
type Comment = {
  id: string;
  author: string;
  authorMeta: string;
  content: string;
  timeAgo: string;
  replies: Reply[];
};
type ComposerMode = 'comment' | 'reply' | null;
const BoardDetailPage = () => {
  const location = useLocation();
  const editState = location.state as EditState | null;

  const navigate = useNavigate();
  const { postId } = useParams();
  const post = useMemo(() => MOCK_POSTS.find((p) => p.id === postId), [postId]);
  if (!post) {
    return (
      <div className="px-6 pt-6">
        <BoardDetailHeader BackIcon={BackIcon} />
        <p className="text-body-14R text-opacity-black-60 mt-6">존재하지 않는 게시글입니다.</p>
      </div>
    );
  }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: post.author,
      authorMeta: post.authorMeta,
      content: '기존 댓글입니다',
      timeAgo: '방금 전',
      replies: [],
    },
  ]);
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [composerMode, setComposerMode] = useState<ComposerMode>(null);
  const [composerValue, setComposerValue] = useState('');

  const commentCount = useMemo(() => {
    return comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);
  }, [comments]);

  const handleDeleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    if (replyTargetId === commentId) {
      setComposerMode(null);
      setReplyTargetId(null);
      setComposerValue('');
    }
  };

  const handleDeleteReply = (commentId: string, replyId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies.filter((r) => r.id !== replyId),
            }
          : c,
      ),
    );
  };
  const baseLikeCount = post.likeCount;
  const [liked, setLiked] = useState(false);
  const likeCount = baseLikeCount + (liked ? 1 : 0);

  useEffect(() => {
    setTitle(editState?.title ?? post.title);
    setContent(editState?.content ?? post.content);
  }, [editState, post.title, post.content]);

  useEffect(() => {
    setLiked(false);
  }, [post.id]);

  return (
    <div className="bg-[#F5F8FF] pb-[170px]">
      <BoardDetailHeader BackIcon={BackIcon} />
      <div className="bg-white px-6">
        <AuthorCard ProfileIcon={ProfileIcon} author={post.author} authorMeta={post.authorMeta} />
        <PostMetaRow
          timeAgo={post.timeAgo}
          viewCount={post.viewCount}
          MoreIcon={MoreIcon}
          EditIcon={EditIcon}
          DeleteIcon={DeleteIcon}
          onEdit={() => {
            navigate(`/social/board/${post.id}/edit`, {
              state: { title, content },
            });
          }}
          onDelete={() => {
            console.log('삭제');
          }}
        />
        <h2 className="text-heading-18B text-base-900 mt-2 w-full self-stretch">{title}</h2>
        <p className="text-body-14R text-opacity-black-80 mt-3 w-full self-stretch break-words whitespace-pre-line">
          {content}
        </p>
        <ReactionBar
          liked={liked}
          likeCount={likeCount}
          commentCount={commentCount}
          FavoriteIcon={FavoriteIcon}
          FavoriteIcon2={FavoriteIcon2}
          MessageIcon={MessageIcon}
          onToggleLike={() => setLiked((p) => !p)}
        />
        <br className="pt-6" />
      </div>

      <div className="px-6 pt-4">
        <span className="text-body-14B">댓글</span>
        &nbsp;
        <span className="text-body-14B text-primary-blue-500">{commentCount}</span>
        {comments.map((c) => (
          <article
            key={c.id}
            className="mt-4 flex w-full flex-col items-start gap-[10px] self-stretch rounded-[8px] border border-[#DBEBFE] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]"
          >
            <CommentCard
              author={c.author}
              authorMeta={c.authorMeta}
              content={c.content}
              timeAgo={c.timeAgo}
              profileSrc={ProfileIcon}
              addIconSrc={AddIcon}
              deleteIconSrc={DeleteIcon2}
              onAdd={() => {
                setComposerMode('reply');
                setReplyTargetId(c.id);
                setComposerValue('');
              }}
              onDelete={() => handleDeleteComment(c.id)}
            />
            {c.replies.map((r) => (
              <CommentCard2
                key={r.id}
                author={r.author}
                authorMeta={r.authorMeta}
                content={r.content}
                timeAgo={r.timeAgo}
                profileSrc={ProfileIcon}
                deleteIconSrc={DeleteIcon2}
                enterIconSrc={enterIcon}
                onDelete={() => handleDeleteReply(c.id, r.id)}
              />
            ))}
          </article>
        ))}
      </div>
      <div className="px-6">
        {composerMode === null ? (
          <div
            onClick={() => {
              setComposerMode('comment');
              setReplyTargetId(null);
              setComposerValue('');
            }}
          >
            <div className="mt-4 flex w-full cursor-pointer flex-col items-start gap-2 self-stretch rounded-[8px] border border-[#4E83F9] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]">
              <span className="text-body-14B text-primary-blue-500">따뜻한 댓글을 남겨주세요!</span>
              <div className="mt-2 flex w-full flex-col items-start gap-2.5 self-stretch rounded-[7px] border border-[0.5px] border-[#D6D6D6] bg-white px-3 py-[11px]">
                <p className="text-caption-12R text-[rgba(17,17,17,0.4)]">댓글을 입력해주세요</p>
              </div>
            </div>
          </div>
        ) : (
          <CommentEditor
            author={post.author}
            authorMeta={post.authorMeta}
            profileSrc={ProfileIcon}
            value={composerValue}
            onChange={setComposerValue}
            onCancel={() => {
              setComposerMode(null);
              setReplyTargetId(null);
              setComposerValue('');
            }}
            onSubmit={() => {
              if (!composerValue.trim()) return;

              if (composerMode === 'comment') {
                setComments((prev) => [
                  ...prev,
                  {
                    id: String(Date.now()),
                    author: post.author,
                    authorMeta: post.authorMeta,
                    content: composerValue,
                    timeAgo: '방금 전',
                    replies: [],
                  },
                ]);
              }

              if (composerMode === 'reply' && replyTargetId) {
                setComments((prev) =>
                  prev.map((c) =>
                    c.id === replyTargetId
                      ? {
                          ...c,
                          replies: [
                            ...c.replies,
                            {
                              id: String(Date.now()),
                              author: post.author,
                              authorMeta: post.authorMeta,
                              content: composerValue,
                              timeAgo: '방금 전',
                            },
                          ],
                        }
                      : c,
                  ),
                );
              }
              setComposerMode(null);
              setReplyTargetId(null);
              setComposerValue('');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BoardDetailPage;
