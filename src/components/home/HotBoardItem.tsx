type HotBoardItemProps = {
  index?: number;
};

const HotBoardItem = ({ index }: HotBoardItemProps) => {
  return (
    // TODO: 추후 5-2 컴포넌트 가져와서 사용
    <div className="bg-base-100 border-primary-blue-100 flex cursor-pointer flex-col gap-4 rounded-2xl border p-4">
      <p className="text-base-900 text-body-16B">컴공 저학년의 커리어 고민 {index}</p>
      <p className="text-base-900 text-caption-12M line-clamp-2">
        안녕하세요 이제 막 컴공 2학년이 된 학생입니다. 백엔드와 프론트엔드 사이에서 어떤 직무를 해야
        할 지 고민입니다. 어떻게 해야할까요 어떡할까요 어떠콸까요
      </p>
    </div>
  );
};

export default HotBoardItem;
