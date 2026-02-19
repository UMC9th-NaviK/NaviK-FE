interface ComparisonProps {
    type: string;
    percentage: number;
}

const ComparisonIncrease = ({ type, percentage } : ComparisonProps) => {
    const getImagePath = () : string | null => {
        const p = Math.abs(percentage);

        if (p === 0) {
            return "/images/growth/GrowthLogZero.png";
        }

        if (type === 'up') {
            if (p >= 30) return "/images/growth/increasing_3.png";
            if (p >= 20) return "/images/growth/increasing_2.png";
            if (p >= 10) return "/images/growth/increasing_1.png";

            return null;
        } 

        if (type === 'down') {
            if (p >= 30) return "/images/growth/decreasing_3.png";
            if (p >= 20) return "/images/growth/decreasing_2.png";
            if (p >= 10) return "/images/growth/decreasing_1.png";

            return null;
        }

        return null
    };

    const imagePath = getImagePath();

    if (!imagePath) {
        return <div className="w-full h-full bg-base-100 min-h-[76.05px]" />;
    }

    return (
        <div className="relative inline-block">
            <img 
            src={imagePath} 
            alt={`${percentage}% ${type === 'up' ? '증가' : '감소'}`}
            className="w-full h-auto"
            />
        </div>
    )
}

export default ComparisonIncrease
