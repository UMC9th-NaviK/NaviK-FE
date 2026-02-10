export function timeAgo(isoString: string): string {
  const now = new Date();
  const target = new Date(isoString);

  const diffMs = now.getTime() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) {
    return '방금 전';
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin}분 전`;
  }

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) {
    return `${diffDay}일 전`;
  }

  // 7일 이상이면 날짜로 표시
  return target.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
