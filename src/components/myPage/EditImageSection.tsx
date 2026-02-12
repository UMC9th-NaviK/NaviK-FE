import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { uploadProfileImage } from '../../apis/s3';
import { putUserProfileImage } from '../../apis/user';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  profileId: number;
  imageUrl: string;
}

const EditImageSection = ({ profileId, imageUrl }: Props) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cacheBuster, setCacheBuster] = useState(() => Date.now());

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // S3 업로드 및 서버 반영
      const uploadedKey = await uploadProfileImage(profileId, file);
      await putUserProfileImage(uploadedKey);

      setCacheBuster(Date.now());

      // 리액트 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: ['myPage'] });
    } catch (error) {
      console.error('이미지 업데이트 실패:', error);
      alert('이미지 수정 중 오류가 발생했습니다.');
    }
  };

  // 상태값(cacheBuster)을 사용하여 이미지 주소 생성

  const displayImageUrl = imageUrl ? `${imageUrl}?t=${cacheBuster}` : '';

  return (
    <div className="absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2">
      <div
        onClick={handleImageClick}
        className="border-base-100 h-full w-full cursor-pointer overflow-hidden rounded-full border-8 bg-gray-100 transition-all hover:brightness-90 active:scale-95"
      >
        <img className="h-full w-full object-cover" src={displayImageUrl} alt="프로필" />
      </div>

      <button
        onClick={handleImageClick}
        className="bg-base-200 absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-transform active:scale-90"
      >
        <Icon icon="material-symbols:add-rounded" width="24" height="24" />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default EditImageSection;
