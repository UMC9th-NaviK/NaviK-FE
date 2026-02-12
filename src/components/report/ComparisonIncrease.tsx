interface ComparisonProps {
    type: string;
    percentage: number;
}

const ComparisonIncrease = ({ type, percentage } : ComparisonProps) => {
    const getImagePath = () => {
        if (type === 'up') {
            if (percentage >= 30) return "/images/growth/increasing_3.png";
            if (percentage >= 20) return "/images/growth/increasing_2.png";
            if (percentage >= 10) return "/images/growth/increasing_1.png";
        } 

        if (type === 'down') {
            if (percentage >= 30) return "/images/growth/decreasing_3.png";
            if (percentage >= 20) return "/images/growth/decreasing_2.png";
            if (percentage >= 10) return "/images/growth/decreasing_1.png";
        }
    };

    return (
        <div className="relative inline-block">
            <img 
                src={getImagePath()} 
                alt={`${percentage}% ${type === 'up' ? '증가' : '감소'}`}
                className="w-full h-auto"
            />
        </div>
    )
}

export default ComparisonIncrease
