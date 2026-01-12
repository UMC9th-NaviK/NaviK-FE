import { useState } from 'react';
import Career from '../../components/onboarding/Career';
import Input from '../../components/onboarding/Input';
import BackHeader from './BackHeader';
import { useNavigate } from 'react-router-dom';
import ButtonSquare from '../../components/common/ButtonSquare';

const OnboardingPage = () => {
  const [career, setCareer] = useState<'신입' | '경력'>('신입');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/setup/job');
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <img
        src="/images/big-symbol-blue.svg"
        alt="NaviK Logo"
        className="pointer-events-none absolute bottom-4.5 left-0 z-0"
      />
      {/* 헤더 */}
      <div className="text-heading-20B z-10 w-full p-6">
        <BackHeader title="프로필 정보 입력" />
        <div className="mt-8.25 flex flex-col gap-7.5">
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
    </div>
  );
};

export default OnboardingPage;
