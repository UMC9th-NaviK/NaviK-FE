import { useEffect, useRef } from "react";
import { ROLE_THEME_MAP } from "../../constants/roleTheme";
import type { KPICardBase } from "../../types/kpiCard";

interface KPICardSliderProps {
    role : string;
    cards: KPICardBase[];
    activeIndex: number;
    onIndexChange: (index: number) => void;
}

const CARD_WIDTH = 284;
const GAP = 14;

const KPICardSlider = ({ role, cards, activeIndex, onIndexChange }: KPICardSliderProps) => {
    const theme = ROLE_THEME_MAP[role] ?? ROLE_THEME_MAP['pm'];

    const sliderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const onScroll = () => {
            const scrollLeft = slider.scrollLeft;
            const index = Math.round(scrollLeft / (CARD_WIDTH + GAP));

            if (index !== activeIndex && index >= 0 && index < cards.length) {
                onIndexChange(index);
            }
        };

        slider.addEventListener("scroll", onScroll, { passive: true });
        return () => slider.removeEventListener("scroll", onScroll);

    }, [activeIndex, cards.length, onIndexChange]); 

    return (
        <div
            ref={sliderRef}
            className="flex w-full items-center overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
            style={{
                gap: `${GAP}px`,

                paddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)`,
                paddingRight: `calc(50% - ${CARD_WIDTH / 2}px)`,
                scrollPaddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)`,
                scrollPaddingRight: `calc(50% - ${CARD_WIDTH / 2}px)`,
            }}
        >
            {cards.map((card, idx) => {
                const isActive = idx === activeIndex;

                return (
                    <div
                        key={card.kpiCardId}
                        className="snap-center shrink-0 flex items-center justify-center"
                        style={{ width: CARD_WIDTH }}
                    >
                        {isActive ? (
                            <img
                                src={card.imageUrl}
                                alt="핵심 역량 카드"
                                className="w-[279px] h-[416.7px] object-contain transition-all duration-300"
                            />
                        ) : (
                            <div
                                className={`${theme.surfaceBg} w-[284px] h-[383px] rounded-[14px] transition-all duration-300`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default KPICardSlider;