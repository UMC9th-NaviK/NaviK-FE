import { useState } from 'react';
import Career from '../../components/onboarding/Career';
import Input from '../../components/onboarding/Input';
import BackHeader from './BackHeader';

const OnboardingPage = () => {
  const [career, setCareer] = useState<'신입' | '경력'>('신입');

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
            <Input title="이름" placeholder="이름을 입력해주세요" />
            <Input title="닉네임" placeholder="닉네임을 입력해주세요" />
            <Career value={career} onChange={setCareer} />
          </div>
          <button className="bg-primary-blue-500 text-base-100 text-body-16B w-full cursor-pointer rounded-lg py-3 text-center">
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
