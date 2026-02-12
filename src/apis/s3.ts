import type { CommonResponse } from '../types/common';
import type { RequestPresignedUrl, ResponsePresignedUrl } from '../types/s3';
import axiosInstance from './axios';

export async function getPresignedUrl(params: RequestPresignedUrl): Promise<ResponsePresignedUrl> {
  console.log('🔑 Presigned URL 요청 시작');
  console.log('파라미터:', params);

  try {
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
      console.error('❌ Presigned URL 발급 실패:', data.message);
      throw new Error(data.message || 'Failed to get presigned URL');
    }

    return data.result;
  } catch (error) {
    console.error('❌ getPresignedUrl 에러:', error);
    throw error;
  }
}

export async function uploadFileToS3(presignedUrl: string, file: File): Promise<void> {
  console.log('📤 S3 파일 업로드 시작');

  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type || 'application/pdf',
      },
    });

    console.log('S3 업로드 응답 상태:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ S3 업로드 실패 응답:', errorText);
      throw new Error(`Failed to upload file to S3: ${response.status} ${response.statusText}`);
    }

    console.log('✅ S3 파일 업로드 성공');
  } catch (error) {
    console.error('❌ uploadFileToS3 에러:', error);
    if (error instanceof Error) {
      console.error('에러 메시지:', error.message);
    }
    throw error;
  }
}

export async function uploadPortfolioPdf(userId: number, file: File): Promise<string> {
  console.log('=== uploadPortfolioPdf 시작 ===');
  console.log('userId:', userId);
  console.log('파일:', file.name);

  try {
    const parts = file.name.split('.');
    const ext = parts.length > 1 ? parts.pop() : 'pdf';
    const extension = '.' + ext;

    console.log('2️⃣ Presigned URL 발급 요청...');
    const { preSignedUrl, key } = await getPresignedUrl({
      pathType: 'PORTFOLIO_PDF',
      id: userId,
      extension,
    });

    await uploadFileToS3(preSignedUrl, file);

    console.log('반환 key:', key);
    return key;
  } catch (error) {
    console.error('=== uploadPortfolioPdf 실패 ===');
    console.error('에러:', error);
    throw error;
  }
}

/**
 * 프로필 이미지 업로드 (발급 + S3 업로드)
 */
export async function uploadProfileImage(userId: number, file: File): Promise<string> {
  try {
    const parts = file.name.split('.');
    const ext = parts.length > 1 ? parts.pop() : 'png';
    const extension = '.' + ext;

    const { preSignedUrl, key } = await getPresignedUrl({
      pathType: 'USER_PROFILE',
      id: userId,
      extension,
    });

    await uploadFileToS3(preSignedUrl, file);

    return key;
  } catch (error) {
    console.error('=== uploadProfileImage 실패 ===');
    throw error;
  }
}
