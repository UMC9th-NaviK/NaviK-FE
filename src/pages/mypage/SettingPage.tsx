import { Icon } from '@iconify/react';
import SubHeader from '../../components/myPage/SubHeader';
import { FOOTERPB } from '../../components/common/Footer';

const SettingPage = () => {
  return (
    <div className="flex w-full flex-col items-center pb-2">
      {/* 헤더*/}
      <SubHeader title="설정" bgColor="bg-base-100" />

      <div className="z-10 flex w-full flex-col gap-5 px-5 pt-5">
        {/* Q&A !*/}
        <section className="flex flex-col gap-3">
          <div className="text-base-900 text-heading-18SB px-1">Q&A</div>
          <button className="border-primary-blue-500 flex h-11.5 w-full items-center justify-between rounded-lg border bg-white p-5">
            <span className="text-primary-blue-500 text-body-14B">
              Na:viK에 대해 더 알고 싶어요!
            </span>
            <Icon
              icon="material-symbols:arrow-forward-ios-rounded"
              className="text-primary-blue-500 h-4 w-4"
            />
          </button>
        </section>

        {/* 개인정보 섹션 */}
        <section className="flex flex-col gap-3">
          <div className="text-base-900 text-heading-18SB px-1">개인정보</div>
          <div className="text-opacity-black-40 shadow-card flex min-h-13 w-full rounded-2xl bg-white p-5">
            본문
          </div>
          <p className="text-opacity-black-40 text-caption-10M px-1">
            * Na:viK은 항해자님의 신원을 확인하고 커뮤니티를 안전하게 유지하기 위해 이 정보를
            사용합니다. 개인정보 중 다른 사람들이 어떤 항목을 볼 수 있는지는 회원님의 결정에 따라
            설정됩니다.
          </p>
        </section>

        {/* 서비스 동의 / 약관 */}
        <section className="flex flex-col gap-3">
          <div className="text-base-900 text-heading-18B px-1">서비스 동의 / 약관</div>
          <div className="text-opacity-black-40 shadow-card flex min-h-13 w-full rounded-2xl bg-white p-5">
            본문
          </div>
        </section>

        {/*(버전, 문의, 로그아웃) */}
        <div className={`mt-25 flex flex-col gap-4 px-1 ${FOOTERPB}`}>
          <div className="text-opacity-black-40 text-body-14R flex justify-between">
            <span>현재 버전</span>
            <span>v1.4.6(3)</span>
          </div>
          <div className="text-opacity-black-40 text-body-14R flex justify-between">
            <span>피드백 및 1대1 문의</span>
            <span className="underline">navik0212@gmail.com</span>
          </div>

          <div className="text-opacity-black-40 text-caption-12R mt-3 flex justify-center gap-4">
            <button>로그아웃</button>
            <span>|</span>
            <button>회원탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
