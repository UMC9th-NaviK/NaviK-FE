import { useState, useRef, useEffect } from "react";
import type { GrowthLogTimelineResponseResult } from "../../types/growth"; //
import { getGrowthLogAggregateScore } from "../../apis/growth/growth";

type DataItem = {
    label: string;
    value: number;
};

interface GrowthChartProps {
    width : number | string;
    height : number | string;
    unit : string;
    type : string;
}

const PADDING_Y = 30;
const BAR_WIDTH = 38.57;

type Point = { x: number; y: number };

const GrowthChart = ({ width, height, unit, type } : GrowthChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [chartData, setChartData] = useState<DataItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const [dims, setDims] = useState({ 
        w: typeof width === 'number' ? width : 425, 
        h: 175 
    });

    useEffect(() => {
        const fetchTimelineData = async () => {
            if (!unit || !type || type === "") return;

            try {
                const response = await getGrowthLogAggregateScore(unit, type); //
                if (response.isSuccess && response.result) {
                    const formattedData: DataItem[] = response.result
                        .slice(-7)
                        .map((item: GrowthLogTimelineResponseResult) => {
                            const month = parseInt(item.period.split('-')[1], 10);
                            return {
                                label: `${month}월`,
                                value: item.cumulativeScore
                            };
                        });

                    setChartData(formattedData);
                    setActiveIndex(formattedData.length - 1)
                }
            } catch (error) {
                console.error("성장 로그 데이터를 불러오는데 실패했습니다:", error);
            }
        };

        fetchTimelineData();
    }, [unit, type]);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const bWidth = containerRef.current.offsetWidth;

                if (bWidth > 0) {
                    setDims(prev => ({ ...prev, w: bWidth }));
                }
            }
        };

        updateSize();

        const observer = new ResizeObserver(() => updateSize());

        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    if (chartData.length === 0) return <div ref={containerRef} style={{ width, height, background: "#fff", borderRadius: 16 }} />;

    const SVG_WIDTH = dims.w - 28; 
    const SVG_HEIGHT = 175;

    const values = chartData.map(d => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const adjustedMin = min - (max - min) * 0.4; 

    const segmentWidth = SVG_WIDTH / chartData.length;
    const getXPos = (index: number) => segmentWidth * index + segmentWidth / 2;

    const dataPoints: Point[] = chartData.map((d, i) => ({
        x: getXPos(i),
        y: PADDING_Y + ((max - d.value) / (max - (max === adjustedMin ? max - 1 : adjustedMin))) * (SVG_HEIGHT - PADDING_Y * 2)
    }));

    const virtualStart = { x: 0, y: dataPoints[0].y };
    const virtualEnd = { x: SVG_WIDTH, y: dataPoints[dataPoints.length - 1].y };

    const pathPoints = [virtualStart, ...dataPoints, virtualEnd];
    const buildSmoothPath = (pts: Point[]) => {
        if (pts.length < 2) return "";
        let d = `M ${pts[0].x} ${pts[0].y}`;
        const tension = 0.2; 
        for (let i = 0; i < pts.length - 1; i++) {
            const curr = pts[i];
            const next = pts[i + 1];
            const prev = pts[i - 1] || curr;
            const nextNext = pts[i + 2] || next;
            const cp1x = curr.x + (next.x - prev.x) * tension;
            const cp1y = curr.y + (next.y - prev.y) * tension;
            const cp2x = next.x - (nextNext.x - curr.x) * tension;
            const cp2y = next.y - (nextNext.y - curr.y) * tension;
            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
        }
        return d;
    };

    const linePath = buildSmoothPath(pathPoints);
    const areaPath = `${linePath} L ${SVG_WIDTH} ${SVG_HEIGHT} L 0 ${SVG_HEIGHT} Z`;
    const activePoint = dataPoints[activeIndex] || dataPoints[0];

    // JSX 구조 및 인라인 CSS 절대 수정 금지 준수
    return (
        <div 
            ref={containerRef}
            style={{ 
                width: width, 
                height: height, 
                padding: "14px", 
                borderRadius: 16, 
                background: "#fff", 
                boxSizing: 'border-box',
                display: 'block'
            }} 
        >
            <svg 
                width={SVG_WIDTH} 
                height={SVG_HEIGHT} 
                style={{ overflow: 'visible', display: 'block' }}
            >
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4E83F9" />
                        <stop offset="100%" stopColor="#9BBEFF" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#DBEBFE" /><stop offset="100%" stopColor="#DBEBFE" stopOpacity={0} /></linearGradient>
                    <linearGradient id="dotGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8D4FE" /><stop offset="100%" stopColor="#4E83F9" /></linearGradient>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#94BBFD" stopOpacity={0} /><stop offset="100%" stopColor="#94BBFD" /></linearGradient>
                </defs>

                <rect x={activePoint.x - BAR_WIDTH / 2} y={0} width={BAR_WIDTH} height={SVG_HEIGHT} fill="url(#barGradient)" opacity={0.3} />
                <path d={areaPath} fill="url(#areaGradient)" />
                <path d={linePath} fill="none" stroke="url(#lineGradient)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={activePoint.x} cy={activePoint.y} r={12} fill="url(#dotGradient)" stroke="#fff" strokeWidth={6} style={{ filter: "drop-shadow(0px 4px 20px rgba(0,0,0,0.15))" }} />
                <line x1={0} y1={SVG_HEIGHT} x2={SVG_WIDTH} y2={SVG_HEIGHT} stroke="#E3E3E3" strokeWidth={1} />
            </svg>

            <div style={{ display: "flex", width: SVG_WIDTH, marginTop: 12 }}>
                {chartData.map((d, i) => (
                    <div key={`${d.label}-${i}`} onClick={() => setActiveIndex(i)} style={{ flex: 1, display: 'flex', justifyContent: 'center', cursor: "pointer" }}>
                        <div className="text-caption-12M" style={{ padding: "2px 8px", borderRadius: 16, color: i === activeIndex ? "#fff" : "#79A6FB", background: i === activeIndex ? "#79A6FB" : "transparent", whiteSpace: 'nowrap' }}>
                            {d.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GrowthChart;