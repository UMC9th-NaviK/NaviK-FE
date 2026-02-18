import ReportNavbar from '../../components/report/ReportNavbar';
import KPIComment from '../../components/report/KPIComment';
import KPICardSlider from '../../components/report/KPICardSlider';
import { useProfile } from '../../hooks/useProfile';
import { ROLE_MAP } from '../../types/role';
import { useState, useEffect } from 'react';
import { getKPICardDetail, getKPICardTop } from '../../apis/report/kpiCard';
import type { KPICardBase, KPICardDetailResponseResult } from '../../types/kpiCard';
import { ROLE_THEME_MAP } from '../../constants/roleTheme';
import { Icon } from '@iconify/react';

const CoreKPIDetailPage = () => {
    const { profile, role } = useProfile();

    const name = profile?.nickname as string;

    const mappedRole = ROLE_MAP[role];

    const theme = ROLE_THEME_MAP[mappedRole] || ROLE_THEME_MAP['designer'];

    const [cards, setCards] = useState<KPICardBase[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [detailData, setDetailData] = useState<KPICardDetailResponseResult | null>(null);
    const [loading, setLoading] = useState(true);

    const [_, setSharing] = useState(false);

    useEffect(() => {
        const fetchInitialCards = async () => {
        try {
                const response = await getKPICardTop();

                setCards(response.result);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchInitialCards();
    }, []);

    useEffect(() => {
        if (cards.length === 0) return;

        const currentId = cards[activeIndex].kpiCardId;

        const fetchDetail = async () => {
            try {
                const response = await getKPICardDetail(currentId, 'strong');

                console.log('API Response:', response);

                setDetailData(response.result);
            } catch (err) {
                console.error('상세조회 실패', err);
            }
        };

        fetchDetail();
    }, [activeIndex, cards]);

    if (loading) {
        return (
        <div className="flex justify-center py-10">
            <Icon
            icon="line-md:loading-twotone-loop"
            style={{ width: '40px', height: '40px' }}
            className="text-primary-blue-500"
            />
        </div>
        );
    }

    const shareToInstagramStory = async () => {
        const currentCardImageUrl = cards[activeIndex]?.sharedImageUrl
        if (!currentCardImageUrl) return;
    
        setSharing?.(true);
    
        try {
            const response = await fetch(currentCardImageUrl, { cache: 'no-cache' });
            const blob = await response.blob();
            
            const file = new File([blob], `card-${Date.now()}.png`, { type: 'image/png' });
    
            const shareData = {
                files: [file],
            };
    
            if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                throw new Error('이 브라우저는 파일 공유를 지원하지 않습니다.');
            }
    
        } catch (error) {
            console.error('공유 실패');
        } finally {
            setSharing?.(false);
        }
    };

    return (
        <div>
        <ReportNavbar />
        <div className="flex flex-col items-center justify-center bg-white">
            <KPICardSlider
            role={mappedRole}
            cards={cards}
            activeIndex={activeIndex}
            onIndexChange={setActiveIndex}
            />

            <div
            className="flex w-full flex-col gap-[16px] bg-white pt-[32px] pr-[16px] pb-[32px] pl-[16px]"
            style={{
                background: `radial-gradient(circle at center, ${theme.gradientVar} 0%, transparent 100%)`,
            }}
            >
            {detailData && (
                <div className="w-full">
                <KPIComment role={mappedRole} detailData={detailData} name={name} />
                </div>
            )}
            <div className="flex flex-col items-center justify-center border-t-[1px] border-[#E3E3E3] text-center">
                <p className="text-caption-12M justify-center pt-[15px] pb-[15px] text-center text-[#111111CC]">
                {' '}
                노력으로 성장한 나의 독보적인 강점 역량, 친구들에게 전달할까요?{' '}
                </p>
                <button 
                onClick={shareToInstagramStory}
                className="flex w-full items-center justify-center h-[48px] gap-[10px] rounded-[8px] bg-[linear-gradient(91.12deg,_#4F5BD5_0%,_#962FBF_25%,_#D62976_50%,_#FA7E1E_75%,_#FEDA75_100%)] pt-[12px] pb-[12px]">
                    <img
                        src="/icons/reports/icon-park-outline_send.svg"
                        alt="인스타그램 바로가기"
                        className=""
                    />
                    <p className="text-body-16M text-[#F5F8FF]"> Instagram 공유 </p>
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default CoreKPIDetailPage;
