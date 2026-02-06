export function makeExcerpt(content: string, maxLength = 80) {
  return content
    .replace(/\n/g, ' ') // 줄바꿈 제거
    .trim()
    .slice(0, maxLength);
}
