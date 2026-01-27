import { useState } from 'react';
import BackHeader from '../../components/common/BackHeader';
import Input from '../../components/onboarding/Input';
import Career from '../../components/onboarding/Career';
import ButtonSquare from '../../components/common/ButtonSquare';
import { useNavigate } from 'react-router-dom';

const ProfileInputPage = () => {
  const [career, setCareer] = useState<'신입' | '경력'>('신입');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/setup/job');
  };
  return (
    <>
      {/* 헤더 */}
      <BackHeader title="프로필 정보 입력" />
      <div className="text-heading-20B z-10 w-full p-4">
        <div className="mt-4.25 flex flex-col gap-7.5">
          <div className="flex flex-col gap-6">
            <Input
              title="이름"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              title="닉네임"
              placeholder="닉네임을 입력해주세요 (선택)"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Career value={career} onChange={setCareer} />
          </div>
          <ButtonSquare text="다음" disabled={!name} onClick={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default ProfileInputPage;
