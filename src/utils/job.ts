export function jobNameFromSub(sub: string | undefined): string | null {
  switch (sub) {
    case '1':
      return '프로덕트 매니저';
    case '2':
      return '프로덕트 디자이너';
    case '3':
      return '프론트엔드 개발자';
    case '4':
      return '백엔드 개발자';
    default:
      return null;
  }
}

export function convertJobToKorean(job: string): string {
  const jobMapping: Record<string, string> = {
    pm: '프로덕트 매니저',
    fe: '프론트엔드 개발자',
    be: '백엔드 개발자',
    de: '프로덕트 디자이너',
  };

  return jobMapping[job] || job;
}
