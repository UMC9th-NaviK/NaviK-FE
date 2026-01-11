import { useState } from 'react';
import Career from '../../components/onboarding/Career';
import Input from '../../components/onboarding/Input';
import BackHeader from './BackHeader';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const [career, setCareer] = useState<'신입' | '경력'>('신입');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/setup/job');
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
      <img
        src="/images/big-symbol-blue.svg"
        alt="NaviK Logo"
        className="absolute bottom-4.5 left-0"
      />
      {/* 헤더 */}
      <div className="text-heading-20B w-full p-6">
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
          <button
            className={`text-base-100 text-body-16B w-full rounded-lg py-3 text-center transition-all ${name ? 'bg-primary-blue-500 cursor-pointer opacity-100' : 'bg-primary-blue-200 cursor-not-allowed opacity-50'}`}
            disabled={!name}
            onClick={onSubmit}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
