import FullStar from '../../assets/social/material-symbols_star-rounded.svg';
import EmptyStar from '../../assets/social/material-symbols_star-outline-rounded.svg';

type StarRatingProps = {
  rating: number;
  max?: number;
};

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  const filledCount = Math.floor(rating);

  return (
    <div className="flex w-full items-center">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: max }).map((_, idx) => (
            <img
              key={idx}
              src={idx < filledCount ? FullStar : EmptyStar}
              alt=""
              className="h-6 w-6"
            />
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-body-14B leading-[160%] tracking-[-0.14px] text-[#4E83F9]">
            {rating}
          </span>
          <span className="text-body-14B leading-[160%] tracking-[-0.14px] text-[rgba(17,17,17,0.4)]">
            /
          </span>
          <span className="text-body-14B leading-[160%] tracking-[-0.14px] text-[rgba(17,17,17,0.4)]">
            {max}
          </span>
        </div>
      </div>
    </div>
  );
}
