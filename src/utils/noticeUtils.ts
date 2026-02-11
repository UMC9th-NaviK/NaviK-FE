import type { ResponseNotice } from '../types/notice';

export type GroupedNotices = {
  today: ResponseNotice[];
  yesterday: ResponseNotice[];
  sevenDays: ResponseNotice[];
};

export function groupNoticesByDate(notices: ResponseNotice[]): GroupedNotices {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return notices.reduce(
    (acc, notice) => {
      const noticeDate = new Date(notice.createdAt);
      const noticeDateOnly = new Date(
        noticeDate.getFullYear(),
        noticeDate.getMonth(),
        noticeDate.getDate(),
      );

      if (noticeDateOnly.getTime() === today.getTime()) {
        acc.today.push(notice);
      } else if (noticeDateOnly.getTime() === yesterday.getTime()) {
        acc.yesterday.push(notice);
      } else if (noticeDateOnly.getTime() >= sevenDaysAgo.getTime()) {
        acc.sevenDays.push(notice);
      }

      return acc;
    },
    { today: [], yesterday: [], sevenDays: [] } as GroupedNotices,
  );
}

export function getNoticeNavigationPath(notice: ResponseNotice): string {
  switch (notice.notificationType) {
    case 'RECRUITMENT':
      // 외부 링크는- 그대로 반환
      return notice.additionalInfoPerNotificationType;
    case 'GOAL':
      // TODO: 목표 상세 페이지 경로 확인
      return `/goals`;
    case 'STUDY':
      // 스터디 상세 페이지로 이동
      return `/social/study/${notice.additionalInfoPerNotificationType}/evaluation`;
    default:
      return '/';
  }
}
