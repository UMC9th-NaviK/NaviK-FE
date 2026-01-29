const NoteActivity = () => {
  return (
    <div className="flex flex-col">
      <p className="text-heading-20B text-base-900 flex">나의 경험 기록하기</p>
      <p className="text-body-14M text-opacity-black-60 pb-4">
        나의 활동을 작성하고, AI 분석을 진행해봐요!
      </p>
      <div className="shadow-card bg-base-100 text-body-14M flex flex-col gap-2 rounded-2xl p-4">
        내용
      </div>
    </div>
  );
};

export default NoteActivity;
