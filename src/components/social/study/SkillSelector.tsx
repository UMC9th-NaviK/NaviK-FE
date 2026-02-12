import { useEffect, useRef, useState } from 'react';
import type { KpiCard } from '../../../types/study';

const BG = '#FFFFFF';

export type SelectedSkill = { roleIndex: number; kpiId: number; name: string } | null;

type Props = {
  roleLabels: readonly string[];
  kpiCardsByRole: Record<number, KpiCard[]>;
  kpiLoading?: boolean;
  selectedSkill: SelectedSkill;
  onSelect: (v: SelectedSkill) => void;
  emptyText?: string;
  onOpenRole: (roleIndex: number) => void;
};

export default function SkillSelector({
  roleLabels,
  kpiCardsByRole,
  kpiLoading = false,
  selectedSkill,
  onSelect,
  emptyText = 'KPI가 없어요.',
  onOpenRole, // ✅ 추가
}: Props) {
  const [openRoleIndex, setOpenRoleIndex] = useState<number | null>(null);
  const activeRoleIndex = selectedSkill?.roleIndex ?? openRoleIndex;

  const bubbleWrapRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const [bubbleLeft, setBubbleLeft] = useState(0);
  const [arrowLeft, setArrowLeft] = useState(0);

  const syncBubblePos = () => {
    if (openRoleIndex === null) return;

    const wrap = bubbleWrapRef.current;
    const btn = btnRefs.current[openRoleIndex];
    if (!wrap || !btn) return;

    const wrapRect = wrap.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const boxW = 200;
    const arrowW = 16;
    const arrowPad = 16;

    const centerX = btnRect.left - wrapRect.left + btnRect.width / 2;

    let left = centerX - boxW / 2;

    const min = 0;
    const max = wrapRect.width - boxW;
    left = Math.max(min, Math.min(max, left));
    setBubbleLeft(left);

    let arrow = centerX - left - arrowW / 2;
    const arrowMin = arrowPad;
    const arrowMax = boxW - arrowPad - arrowW;
    arrow = Math.max(arrowMin, Math.min(arrowMax, arrow));
    setArrowLeft(arrow);
  };

  useEffect(() => {
    syncBubblePos();
    window.addEventListener('resize', syncBubblePos);
    return () => window.removeEventListener('resize', syncBubblePos);
  }, [openRoleIndex]);

  useEffect(() => {
    if (openRoleIndex === null) return;

    const handleClickOutside = (e: MouseEvent) => {
      const bubbleEl = bubbleRef.current;
      const wrapEl = bubbleWrapRef.current;
      if (!bubbleEl || !wrapEl) return;

      const target = e.target as Node;
      if (bubbleEl.contains(target)) return;
      if (wrapEl.contains(target)) return;

      setOpenRoleIndex(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openRoleIndex]);

  const cards = openRoleIndex !== null ? (kpiCardsByRole[openRoleIndex] ?? []) : [];

  return (
    <div ref={bubbleWrapRef} className="relative mt-6 flex w-full flex-col">
      <div className="flex items-center gap-2">
        <span className="text-body-14B text-[#111111]">키우고 싶은 역량을 선택해주세요.</span>
      </div>

      <div className="mt-2 flex w-full gap-[8px] overflow-hidden">
        {roleLabels.map((label, index) => {
          const isActive = activeRoleIndex === index;

          return (
            <button
              key={label}
              ref={(el) => {
                btnRefs.current[index] = el;
              }}
              type="button"
              onClick={() => {
                setOpenRoleIndex(index);
                onOpenRole(index); // ✅ KPI fetch 트리거
                onSelect(null);
                console.log(
                  '[SkillSelector] openRoleIndex:',
                  index,
                  'cards:',
                  kpiCardsByRole[index],
                );
              }}
              className={`text-body-14M flex h-[32px] min-w-0 flex-1 cursor-pointer items-center justify-center rounded-[8px] border px-[16px] py-[8px] whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-primary-blue-900 border-[#B8D4FE] bg-[#B8D4FE]'
                  : 'text-opacity-black-60 border-[#B8D4FE] bg-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {selectedSkill && (
        <div className="mt-3 flex w-full items-center">
          <div className="flex w-full flex-col rounded-[8px] bg-[#F5F8FF] p-2">
            <div className="flex w-full items-center justify-between">
              <div className="flex gap-1">
                <span className="text-caption-12B text-primary-blue-500">KPI</span>
                <span className="text-caption-12M text-opacity-black-80">{selectedSkill.name}</span>
              </div>
              <span className="text-caption-12M text-opacity-black-80">✔️</span>
            </div>
          </div>
        </div>
      )}

      {openRoleIndex !== null && (
        <div ref={bubbleRef} className="absolute z-50" style={{ left: bubbleLeft, top: 77 }}>
          <div className="relative">
            <div className="absolute -top-[11px]" style={{ left: arrowLeft }}>
              <svg
                width="16"
                height="11.942"
                viewBox="0 0 16 11.942"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0L16 11.942H0L8 0Z" fill={BG} stroke="#E5E7EB" strokeWidth="1" />
              </svg>
            </div>

            <div
              className="border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
              style={{ width: 208, height: 347, borderRadius: 24, background: BG }}
            >
              <div className="h-full overflow-hidden p-2">
                <ul className="scrollbar-hide flex h-full flex-col gap-[14px] overflow-auto p-2">
                  {kpiLoading && cards.length === 0 && (
                    <li className="text-caption-12R text-opacity-black-60 px-2 py-1">
                      KPI 불러오는 중...
                    </li>
                  )}

                  {!kpiLoading && cards.length === 0 && (
                    <li className="text-caption-12R text-opacity-black-60 px-2 py-1">
                      {emptyText}
                    </li>
                  )}

                  {cards.map((card, i) => {
                    const isSelected =
                      selectedSkill?.roleIndex === openRoleIndex &&
                      selectedSkill?.kpiId === card.kpiId;

                    return (
                      <li
                        key={card.kpiId}
                        className="group relative flex cursor-pointer items-start gap-[12px]"
                        onClick={() => {
                          onSelect({
                            roleIndex: openRoleIndex,
                            kpiId: card.kpiId,
                            name: card.name,
                          });
                          setOpenRoleIndex(null);
                        }}
                      >
                        <div className="pointer-events-none absolute -inset-[8px] rounded-full bg-[rgba(17,17,17,0.10)] opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="text-caption-12B text-primary-blue-500 relative z-10 leading-[160%]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`text-caption-12R relative z-10 leading-[160%] ${
                            isSelected
                              ? 'text-primary-blue-500 font-semibold'
                              : 'text-opacity-black-80'
                          }`}
                        >
                          {card.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
