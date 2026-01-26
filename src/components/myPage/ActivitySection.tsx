import { useState } from 'react';

const ActivitySection = () => {
  // 상태로 관리해야 사용자가 입력하는 값을 저장할 수 있어요!
  const [activities, setActivities] = useState([
    { id: 1, content: '활동 이력 내용' },
    { id: 2, content: '활동 이력 내용' },
    { id: 3, content: '활동 이력 내용' },
  ]);

  // 입력값이 바뀔 때 상태 업데이트하는 함수
  const handleInputChange = (id: number, value: string) => {
    setActivities((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content: value } : item)),
    );
  };

  return (
    <section className="border-primary-blue-200 mb-4 flex h-48.5 w-85.75 flex-col gap-4 rounded-2xl border bg-white p-4">
      <div className="text-primary-blue-500 text-body-16B">내 활동 및 이력</div>

      <div className="flex flex-col gap-2">
        {activities.map((item) => (
          <div
            key={item.id}
            className="border-base-200 focus-within:border-primary-blue-500 bg-base-100 flex h-9 w-78 items-center rounded-[10px] border px-4 transition-colors"
          >
            <div className="flex w-full items-center gap-2">
              <div className="bg-base-400 h-1 w-1 shrink-0 rounded-full" />
              <input
                type="text"
                value={item.content}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
                className="text-opacity-black-60 text-body-14M w-full bg-transparent outline-none"
                placeholder="내용을 입력해주세요"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySection;
