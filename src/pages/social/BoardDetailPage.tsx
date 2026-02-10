import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
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
import {
  getBoardDetail,
  toggleBoardLike,
  deleteBoard,
  getBoardCommentCount,
  getBoardComments,
  createBoardComment,
  createBoardReply,
  deleteBoardComment,
} from '../../apis/board';
import type { BoardDetail, BoardCommentItem } from '../../apis/board';

type EditState = {
  title?: string;
  content?: string;
};

type ComposerMode = 'comment' | 'reply' | null;

const BoardDetailPage = () => {
  const location = useLocation();
  const editState = location.state as EditState | null;

  const navigate = useNavigate();

  const { boardId } = useParams<{ boardId: string }>();
  const [detail, setDetail] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [comments, setComments] = useState<BoardCommentItem[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [composerMode, setComposerMode] = useState<ComposerMode>(null);
  const [composerValue, setComposerValue] = useState('');

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  const [serverCommentCount, setServerCommentCount] = useState(0);

  const parentComments = useMemo(
    () => comments.filter((c) => c.parentCommentId == null || c.parentCommentId === 0),
    [comments],
  );

  const repliesByParentId = useMemo(() => {
    const map = new Map<number, BoardCommentItem[]>();

    comments.forEach((c) => {
      const pid = c.parentCommentId;

      // ✅ pid가 없거나 0이면 "부모댓글" 이므로 replies map에 넣지 않음
      if (pid == null || pid === 0) return;

      const parentId = Number(pid);
      if (Number.isNaN(parentId)) return;

      const arr = map.get(parentId) ?? [];
      arr.push(c);
      map.set(parentId, arr);
    });

    return map;
  }, [comments]);

  useEffect(() => {
    if (!boardId) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getBoardDetail(Number(boardId));

        if (!res.data?.isSuccess) {
          setError(res.data?.message ?? '상세 조회 실패');
          return;
        }

        const data = res.data.result;
        setDetail(data);

        const cntRes = await getBoardCommentCount(Number(boardId));
        if (cntRes.data?.isSuccess) {
          setServerCommentCount(cntRes.data.result.totalCommentCount ?? 0);
        }

        setLikeCount(data.likeCount ?? 0);
        setLiked(typeof (data as any).isLiked === 'boolean' ? (data as any).isLiked : false);
      } catch (e) {
        console.error(e);
        setError('네트워크 오류');
      } finally {
        setLoading(false);
      }
    })();
  }, [boardId]);

  useEffect(() => {
    if (!(location.state as any)?.refresh) return;

    (async () => {
      try {
        const res = await getBoardDetail(Number(boardId));
        if (res.data?.isSuccess) {
          const data = res.data.result;
          setDetail(data);
          setLikeCount(data.likeCount ?? 0);
          setLiked(typeof (data as any).isLiked === 'boolean' ? (data as any).isLiked : false);
        }
      } finally {
        navigate(location.pathname, { replace: true, state: null });
      }
    })();
  }, [location.state, boardId, navigate]);

  useEffect(() => {
    if (!detail) return;
    setTitle(editState?.title ?? detail.articleTitle);
    setContent(editState?.content ?? detail.articleContent);
  }, [editState, boardId, detail]);

  const handleDeletePost = async () => {
    if (!boardId || deleting) return;
    const ok = window.confirm('게시글을 삭제할까요? 삭제 후 복구할 수 없어요');
    if (!ok) return;

    try {
      setDeleting(true);

      const res = await deleteBoard(Number(boardId));
      const successByBody = res.data?.isSuccess === true;
      const successByStatus = res.status === 204;

      if (!successByBody && !successByStatus) {
        console.warn(res.data?.message ?? '게시글 삭제 실패');
        return;
      }

      navigate('/social/board', { state: { refresh: true }, replace: true });
    } catch (e: any) {
      console.error('[DELETE ERR]', {
        status: e?.response?.status,
        data: e?.response?.data,
        message: e?.message,
      });
    } finally {
      setDeleting(false);
    }
  };

  const removeCommentFromState = (commentId: number) => {
    setComments((prev) => prev.filter((c) => c.commentId !== commentId));

    if (replyTargetId === String(commentId)) {
      setComposerMode(null);
      setReplyTargetId(null);
      setComposerValue('');
    }
  };

  const fetchComments = async () => {
    if (!boardId) return;
    try {
      setCommentLoading(true);
      setCommentError(null);

      const res = await getBoardComments(Number(boardId), {
        page: 0,
        size: 20,
        sort: ['createdAt,desc'],
      });

      if (!res.data?.isSuccess) {
        setCommentError(res.data?.message ?? '댓글 조회 실패');
        setComments([]);
        return;
      }

      setComments(res.data.result.content ?? []);
    } catch (e) {
      console.error(e);
      setCommentError('댓글 네트워크 오류');
      setComments([]);
    } finally {
      setCommentLoading(false);
    }
  };

  const fetchCommentCount = async () => {
    if (!boardId) return;
    const cntRes = await getBoardCommentCount(Number(boardId));
    if (cntRes.data?.isSuccess) {
      setServerCommentCount(cntRes.data.result.totalCommentCount ?? 0);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [boardId]);

  if (loading) {
    return (
      <div className="px-6 pt-6">
        <BoardDetailHeader BackIcon={BackIcon} />
        <p className="text-body-14R text-opacity-black-60 mt-6">로딩중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 pt-6">
        <BoardDetailHeader BackIcon={BackIcon} />
        <p className="text-body-14R text-opacity-black-60 mt-6">{error}</p>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="px-6 pt-6">
        <BoardDetailHeader BackIcon={BackIcon} />
        <p className="text-body-14R text-opacity-black-60 mt-6">데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FF] pb-[170px]">
      <BoardDetailHeader BackIcon={BackIcon} />

      <div className="bg-white px-6">
        <AuthorCard
          ProfileIcon={ProfileIcon}
          author={detail.nickname}
          authorMeta={`${detail.isEntryLevel ? '신입' : '마스터'} ${detail.jobName} | LV.${detail.level}`}
        />

        <PostMetaRow
          timeAgo={detail?.createdAt}
          viewCount={detail?.viewCount}
          MoreIcon={MoreIcon}
          EditIcon={EditIcon}
          DeleteIcon={DeleteIcon}
          onEdit={() => {
            navigate(`/social/board/${boardId}/edit`, {
              state: { title, content },
            });
          }}
          onDelete={handleDeletePost}
        />

        <h2 className="text-heading-18B text-base-900 mt-2 w-full self-stretch">{title}</h2>

        <p className="text-body-14R text-opacity-black-80 mt-3 w-full self-stretch break-words whitespace-pre-line">
          {content}
        </p>

        <ReactionBar
          liked={liked}
          likeCount={likeCount}
          commentCount={serverCommentCount}
          FavoriteIcon={FavoriteIcon}
          FavoriteIcon2={FavoriteIcon2}
          MessageIcon={MessageIcon}
          onToggleLike={async () => {
            if (!boardId || likeLoading) return;

            const prevLiked = liked;
            const nextLiked = !prevLiked;
            const delta = nextLiked ? 1 : -1;

            try {
              setLikeLoading(true);
              setLiked(nextLiked);
              setLikeCount((prev) => prev + delta);

              const res = await toggleBoardLike(Number(boardId));

              if (!res.data?.isSuccess) {
                console.warn(res.data?.message ?? '좋아요 토글 실패');
                setLiked(prevLiked);
                setLikeCount((prev) => prev - delta);
                return;
              }

              const r = res.data.result;
              if (typeof r.isLiked === 'boolean') setLiked(r.isLiked);
              if (typeof r.likeCount === 'number') setLikeCount(r.likeCount);
            } catch (e) {
              console.error(e);
              setLiked(prevLiked);
              setLikeCount((prev) => prev - delta);
            } finally {
              setLikeLoading(false);
            }
          }}
        />

        <div className="pt-6" />
      </div>

      <div className="px-6 pt-4">
        <span className="text-body-14B">댓글</span>&nbsp;
        <span className="text-body-14B text-primary-blue-500">{serverCommentCount}</span>
        {commentLoading && (
          <p className="text-body-14R text-opacity-black-60 mt-4">댓글 불러오는 중...</p>
        )}
        {commentError && <p className="text-body-14R text-opacity-black-60 mt-4">{commentError}</p>}
        {parentComments.map((c) => {
          const replies = repliesByParentId.get(c.commentId) ?? [];

          return (
            <article
              key={c.commentId}
              className="mt-4 flex w-full flex-col items-start gap-[10px] self-stretch rounded-[8px] border border-[#DBEBFE] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]"
            >
              <CommentCard
                author={c.nickname}
                authorMeta={`${c.isEntryLevel ? '신입' : '마스터'} ${c.jobName} | LV.${c.level}`}
                content={c.content}
                timeAgo={c.createdAt}
                profileSrc={ProfileIcon}
                addIconSrc={AddIcon}
                deleteIconSrc={DeleteIcon2}
                onAdd={() => {
                  setComposerMode('reply');
                  setReplyTargetId(String(c.commentId));
                  setComposerValue('');
                }}
                onDelete={
                  c.isMyComment
                    ? async () => {
                        if (!boardId) return;

                        const ok = window.confirm('댓글을 삭제할까요?');
                        if (!ok) return;

                        try {
                          const res = await deleteBoardComment(Number(boardId), c.commentId);
                          const successByBody = res.data?.isSuccess === true;
                          const successByStatus = res.status === 204;

                          if (!successByBody && !successByStatus) {
                            console.warn(res.data?.message ?? '댓글 삭제 실패');
                            return;
                          }

                          removeCommentFromState(c.commentId);
                          await fetchCommentCount();
                        } catch (e) {
                          console.error(e);
                        }
                      }
                    : undefined
                }
              />

              {replies.map((r) => {
                const replyMeta = `${r.isEntryLevel ? '신입' : '마스터'} ${r.jobName} | LV.${r.level}`;
                return (
                  <CommentCard2
                    key={r.commentId}
                    author={r.nickname}
                    authorMeta={replyMeta}
                    content={r.content}
                    timeAgo={r.createdAt}
                    profileSrc={ProfileIcon}
                    deleteIconSrc={DeleteIcon2}
                    enterIconSrc={enterIcon}
                    onDelete={
                      r.isMyComment
                        ? async () => {
                            if (!boardId) return;

                            const ok = window.confirm('대댓글을 삭제할까요?');
                            if (!ok) return;

                            try {
                              const res = await deleteBoardComment(Number(boardId), r.commentId);
                              const successByBody = res.data?.isSuccess === true;
                              const successByStatus = res.status === 204;

                              if (!successByBody && !successByStatus) {
                                console.warn(res.data?.message ?? '대댓글 삭제 실패');
                                return;
                              }

                              removeCommentFromState(r.commentId);
                              await fetchCommentCount();
                            } catch (e) {
                              console.error(e);
                            }
                          }
                        : undefined
                    }
                  />
                );
              })}
            </article>
          );
        })}
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
            author="나"
            authorMeta="마스터 | LV.3"
            profileSrc={ProfileIcon}
            value={composerValue}
            onChange={setComposerValue}
            onCancel={() => {
              setComposerMode(null);
              setReplyTargetId(null);
              setComposerValue('');
            }}
            onSubmit={async () => {
              if (!boardId) return;

              const text = composerValue.trim();
              if (!text) return;

              try {
                if (composerMode === 'comment') {
                  const res = await createBoardComment(Number(boardId), { content: text });
                  if (!res.data?.isSuccess) {
                    console.warn(res.data?.message ?? '댓글 작성 실패');
                    return;
                  }
                }

                if (composerMode === 'reply') {
                  if (!replyTargetId) return;
                  const res = await createBoardReply(Number(boardId), Number(replyTargetId), {
                    content: text,
                  });
                  if (!res.data?.isSuccess) {
                    console.warn(res.data?.message ?? '대댓글 작성 실패');
                    return;
                  }
                }

                setComposerMode(null);
                setReplyTargetId(null);
                setComposerValue('');

                await Promise.all([fetchComments(), fetchCommentCount()]);
              } catch (e) {
                console.error(e);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BoardDetailPage;
