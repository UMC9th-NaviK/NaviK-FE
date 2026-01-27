import BackHeader from '../../components/common/BackHeader';
import ButtonSquare from '../../components/common/ButtonSquare';
import PolicyItem from '../../components/onboarding/PolicyItem';

const PolicyPage = () => {
  return (
    <>
      <BackHeader title="이용 약관" />
      <div className="flex flex-col items-center">
        <p className="text-base-900 text-heading-20B py-8.25 text-center">
          서비스 이용을 위해
          <br />
          약관 동의가 필요해요
        </p>
        <div className="flex w-full flex-col px-4">
          <div className="flex flex-col gap-4">
            <div className="border-b-base-200 flex gap-2 border-b py-4">
              {/* 체크박스 */}
              <p className="text-heading-18B text-primary-blue-500">전체 동의하기</p>
            </div>
            <div>
              <PolicyItem />
              <PolicyItem />
              <PolicyItem />
              <PolicyItem />
            </div>
          </div>
          <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-6">
            <ButtonSquare onClick={() => {}} text="나의 직무 선택하기" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyPage;
