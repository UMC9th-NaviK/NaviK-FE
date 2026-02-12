// src/utils/format.ts

export const cleanImageUrl = (url: string | undefined | null): string => {
  if (!url) return '';

  // 1. 앞뒤 따옴표("), 역슬래시(\) 등 불필요한 문자 제거
  const cleaned = url.replace(/["\\]/g, '');

  // 2. 만약 이미 전체 주소(http...)라면 그대로 반환
  if (cleaned.startsWith('http')) {
    return cleaned;
  }

  const S3_BASE_URL = 'https://navik-bucket.s3.ap-northeast-2.amazonaws.com';

  // 만약 cleaned가 /로 시작하면 그냥 붙이고, 아니면 중간에 / 추가
  return cleaned.startsWith('/') ? `${S3_BASE_URL}${cleaned}` : `${S3_BASE_URL}/${cleaned}`;
};
