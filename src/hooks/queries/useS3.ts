import { useMutation } from '@tanstack/react-query';
import { getPresignedUrl, uploadFileToS3, uploadPortfolioPdf } from '../../apis/s3';
import type { RequestPresignedUrl } from '../../types/s3';

/**
 * Presigned URL 발급
 */
export const useGetPresignedUrl = () => {
  return useMutation({
    mutationFn: (params: RequestPresignedUrl) => getPresignedUrl(params),
  });
};

/**
 * S3 파일 업로드
 */
export const useUploadToS3 = () => {
  return useMutation({
    mutationFn: ({ presignedUrl, file }: { presignedUrl: string; file: File }) =>
      uploadFileToS3(presignedUrl, file),
  });
};

/**
 * 포트폴리오 PDF 업로드 (발급 + 업로드)
 */
export const useUploadPortfolioPdf = () => {
  return useMutation({
    mutationFn: ({ userId, file }: { userId: number; file: File }) =>
      uploadPortfolioPdf(userId, file),
  });
};
