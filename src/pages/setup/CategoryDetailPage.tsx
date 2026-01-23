const CategoryDetailPage = () => {
  return (
    // TODO: 직무에 따른 색상 변경
    <div className="gradient-bg-pm relative flex min-h-dvh w-full flex-col">
      <img src="/images/small-symbol-white.svg" className="absolute -top-10 -right-8 w-64" />
      <div className="bg-white-background pointer-events-none absolute top-67.25 right-0 bottom-0 left-0 w-full overflow-hidden rounded-t-2xl">
        <div className="gradient-bg-circle pointer-events-none absolute -bottom-100 left-1/2 h-157 w-157 -translate-x-1/2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
      </div>
      {/* 직무 내용 */}
      <div className="relative z-10 w-full pb-12.25"></div>
    </div>
  );
};

export default CategoryDetailPage;
