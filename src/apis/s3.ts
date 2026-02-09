import type { CommonResponse } from '../types/common';
import type { RequestPresignedUrl, ResponsePresignedUrl } from '../types/s3';
import axiosInstance from './axios';

export async function getPresignedUrl(params: RequestPresignedUrl): Promise<ResponsePresignedUrl> {
  const { data } = await axiosInstance.get<CommonResponse<ResponsePresignedUrl>>(
    '/s3/presigned-url',
    {
      params: {
        pathType: params.pathType,
        id: params.id,
        extension: params.extension,
      },
    },
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to get presigned URL');
  }

  return data.result;
}

export async function uploadFileToS3(presignedUrl: string, file: File): Promise<void> {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to upload file to S3');
  }
}

export async function uploadPortfolioPdf(userId: number, file: File): Promise<string> {
  const extension = '.' + file.name.split('.').pop();

  const { preSignedUrl, key } = await getPresignedUrl({
    pathType: 'PORTFOLIO_PDF',
    id: userId,
    extension,
  });

  await uploadFileToS3(preSignedUrl, file);
  return key;
}
