import ReportNavbar from '../../components/report/ReportNavbar'
import KPIComment from '../../components/report/KPIComment'
import KPICardSlider from '../../components/report/KPICardSlider';
import { useProfile } from '../../hooks/useProfile';
import { ROLE_MAP } from '../../types/role';
import { useState, useEffect } from 'react';
import { getKPICardDetail, getKPICardTop } from '../../apis/report/kpiCard';
import type { KPICardBase, KPICardDetailResponseResult } from '../../types/kpiCard';
import { ROLE_THEME_MAP } from '../../constants/roleTheme';

const CoreKPIDetailPage = () => {
    const { role } = useProfile();

    const mappedRole = ROLE_MAP[role];

    const theme = ROLE_THEME_MAP[mappedRole] || ROLE_THEME_MAP['designer'];
    
    const [cards, setCards] = useState<KPICardBase[]>([]);
    const [activeIndex, setActiveIndex] = useState(0); 
    const [detailData, setDetailData] = useState<KPICardDetailResponseResult | null>(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialCards = async () => {
            try {
                const response = await getKPICardTop();

                setCards(response.result);
                setLoading(false);
            } 
            
            catch (err) {
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
                const response = await getKPICardDetail(currentId, "strong");

                console.log("API Response:", response);

                setDetailData(response.result);
            } 
            
            catch (err) {
                console.error("상세조회 실패", err);
            }
        };

        fetchDetail();
    }, [activeIndex, cards]);

    if (loading) return <div>로딩 중...</div>;

    const shareToInstagramStory = async () => {
        // 1. 공유할 이미지 URL 선택 (현재 슬라이드의 카드 이미지)
        const currentCardImageUrl = cards[activeIndex]?.imageUrl; 
        if (!currentCardImageUrl) {
            alert("공유할 이미지가 없습니다.");
            return;
        }
    
        try {
            const response = await fetch(currentCardImageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'kpi-card.png', { type: 'image/png' });
    
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: '나의 KPI 역량 카드',
                    text: '내 강점 역량을 확인해보세요!',
                });
            } 
            
            else {
                alert("이 브라우저에서는 공유 기능을 지원하지 않습니다. 크롬이나 사파리 앱을 이용해주세요.");
            }
        } catch (error) {
            console.error("공유 실패:", error);
        }
    };

    return (
        <div>
            <ReportNavbar />
            <div className='flex flex-col bg-white items-center justify-center'>
                <KPICardSlider 
                role={mappedRole}
                cards={cards} 
                activeIndex={activeIndex} 
                onIndexChange={setActiveIndex} 
                />
                
                <div 
                className='flex flex-col w-full bg-white pt-[32px] pb-[32px] pr-[16px] pl-[16px] gap-[16px]'
                style={{ background: `radial-gradient(circle at center, ${theme.gradientVar} 0%, transparent 100%)` }} >
                    {detailData && (
                        <div className="w-full">
                            <KPIComment 
                            role={mappedRole}
                            detailData={detailData}
                            />
                        </div>
                    )}
                    <div className='flex flex-col items-center text-center justify-center border-t-[1px] border-[#E3E3E3]'>
                        <p className='text-center pt-[15px] pb-[15px] justify-center text-caption-12M text-[#111111CC]'> 노력으로 성장한 나의 독보적인 강점 역량, 친구들에게 전달할까요? </p>
                        <button 
                        className='flex bg-[linear-gradient(91.12deg,_#4F5BD5_0%,_#962FBF_25%,_#D62976_50%,_#FA7E1E_75%,_#FEDA75_100%)] h-[48px] rounded-[8px] pt-[12px] pb-[12px] pr-[100px] pl-[100px] gap-[10px]'> 
                            <img 
                            src="/icons/reports/icon-park-outline_send.svg"
                            alt="인스타그램 바로가기"
                            className=''
                            onClick={shareToInstagramStory}
                            />
                            <p className='flex-1 text-body-16M text-[#F5F8FF]'> Instagram 공유 </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoreKPIDetailPage
