import { useEffect, useState } from 'react';
import { getAbilityList } from '../../apis/ability';
import type { AbilityItem } from '../../types/ability';

const ActivitySection = () => {
  const [abilities, setAbilities] = useState<AbilityItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAbilities = async (cursor?: string) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const data = await getAbilityList(10, cursor);
      setAbilities((prev) => (cursor ? [...prev, ...data.content] : data.content));
      setNextCursor(data.nextCursor);
      setHasNext(data.hasNext);
    } catch (error) {
      console.error('활동 이력 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAbilities();
  }, []);

  return (
    <section className="border-primary-blue-200 mb-4 flex h-60 w-85.75 flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all">
      <div className="text-primary-blue-500 text-body-16B font-bold">내 활동 및 이력</div>

      <div className="scrollbar-hide flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {abilities.length > 0
          ? abilities.map((item) => (
              <div
                key={item.abilityId}
                className="border-base-200 bg-base-100 flex min-h-9 w-full shrink-0 items-center rounded-[10px] border px-4 py-2 transition-colors"
              >
                <div className="flex w-full items-start gap-2">
                  {' '}
                  <div className="bg-base-400 mt-2 h-1 w-1 shrink-0 rounded-full" />{' '}
                  <span className="text-opacity-black-60 text-body-14M break-all whitespace-normal">
                    {item.content}
                  </span>
                </div>
              </div>
            ))
          : !isLoading && (
              <div className="text-opacity-black-20 text-body-14M py-4 text-center">
                등록된 활동 이력이 없습니다.
              </div>
            )}

        {hasNext && (
          <button
            onClick={() => fetchAbilities(nextCursor ?? undefined)}
            disabled={isLoading}
            className="text-caption-12M text-base-400 active:text-primary-blue-500 self-center py-2 underline"
          >
            {isLoading ? '로딩 중...' : '활동 더 가져오기'}
          </button>
        )}
      </div>
    </section>
  );
};

export default ActivitySection;
