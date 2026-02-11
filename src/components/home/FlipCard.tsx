type FlipCardProps = {
  frontImageUrl?: string;
  backImageUrl: string;
  isFlipped: boolean;
  className?: string;
  altText: string;
};

const FlipCard = ({
  frontImageUrl,
  backImageUrl,
  isFlipped,
  className = '',
  altText,
}: FlipCardProps) => {
  return (
    <div className={`w-25 shrink-0 ${className}`} style={{ perspective: '1000px' }}>
      <div
        className="relative transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 뒷면 */}
        <img
          src={backImageUrl}
          alt={`${altText} 뒷면`}
          className="w-full"
          style={{
            backfaceVisibility: 'hidden',
          }}
        />
        {/* 앞면 */}
        {frontImageUrl && (
          <img
            src={frontImageUrl}
            alt={`${altText} 앞면`}
            className="absolute inset-0 w-full"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FlipCard;
