import ButtonRound from '../../components/common/ButtonRound';
import JobKpi from '../../components/setup/JobKpi';
import JobSummary from '../../components/setup/JobSummary';
import MyActivity from '../../components/setup/MyActivity';

const CategoryDetailPage = () => {
  return (
    // TODO: 직무에 따른 색상 변경
    <div className="gradient-bg-pm relative flex min-h-dvh w-full flex-col overflow-hidden">
      <img src="/images/small-symbol-white.svg" className="absolute -top-10 -right-8 w-64" />
      <div className="bg-white-background pointer-events-none absolute top-67.25 right-0 bottom-0 left-0 w-full overflow-hidden rounded-t-2xl">
        <div className="gradient-bg-circle pointer-events-none absolute -bottom-100 left-1/2 h-157 w-157 -translate-x-1/2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
      </div>
      {/* 직무 내용 */}
      <div className="relative z-10 flex w-full flex-col gap-4 px-4 pt-6 pb-12.25">
        <section className="flex flex-col gap-6">
          <span className="flex flex-col gap-2">
            <p className="text-heading-20B text-primary-blue-500">나의 직무, 이렇게 시작해요</p>
            <p className="text-body-16M text-opacity-black-80 flex">
              내 활동을 입력해&nbsp;
              <p className="text-body-16B">커리어 나침반</p>을 완성해 보세요
            </p>
          </span>
          <div className="flex flex-col gap-4">
            {/* TODO: 이미지 교체 예정 */}
            <img src="/images/category/pm.png" className="h-full w-full object-cover" />
            <JobSummary />
            <JobKpi role="pm" />
          </div>
          <MyActivity />
        </section>
        <ButtonRound text="나의 경험 입력하기" onClick={() => {}} color="white" />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
