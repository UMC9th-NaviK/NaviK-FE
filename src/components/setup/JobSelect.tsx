import ButtonRound from '../common/ButtonRound';

const JobSelect = () => {
  return (
    <div className="relative flex min-h-dvh flex-col items-center gap-10 px-4 pt-6">
      <div className="flex flex-col items-center gap-2">
        <p className="text-heading-20B text-primary-blue-500">직무 선택</p>
        <span className="text-opacity-black-80 text-body-16M flex">
          항해자님의&nbsp;
          <p className="text-body-16B">커리어 출발점을&nbsp;</p>
          골라주세요
        </span>
      </div>
      {/* 카테고리 선택 구역 */}
      {/* 버튼 - 하단 고정 */}
      <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-6">
        <ButtonRound onClick={() => {}} text="확인" />
      </div>
    </div>
  );
};

export default JobSelect;
