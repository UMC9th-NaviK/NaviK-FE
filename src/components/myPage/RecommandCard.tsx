import sklogo from '../../../public/images/mypage/SKlogo.svg';

type RecommandCardProps = {
  className?: string;
};

const RecommandCard = ({ className }: RecommandCardProps) => {
  return (
    <div
      className={`flex h-auto w-72 flex-col gap-3 rounded-lg border border-[#D6D6D6] px-4 py-3 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <img src={sklogo} />
          <div className="text-body-14M text-[#111111CC]">SK 쉘더스</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="text-caption-12M flex h-7 w-11 items-center justify-center rounded-lg border border-[#E72326]/10 bg-[#E72326]/10 text-red-500">
            D-10
          </div>
        </div>
      </div>
      <div className="text-body-16B font-bold text-[#111111CC]">
        IT인프라TA 주니어 백엔드 개발자 채용
      </div>

      {/*테그 영역*/}
      <div className="flex flex-col gap-y-1.5">
        {/*회색 테그 영역*/} {/*나중에 map으로 구현 예정*/}
        <div className="flex items-center gap-x-1">
          <div className="flex h-6 w-fit items-center justify-center rounded-xl border border-[#E3E3E3] bg-[#E3E3E380]/50 px-2">
            <span className="text-base-900/60 text-caption-12M">서울 영등포구 외 1</span>
          </div>
          <div className="flex h-6 w-fit items-center justify-center rounded-xl border border-[#E3E3E3] bg-[#E3E3E380]/50 px-2">
            <span className="text-base-900/60 text-caption-12M">경력무관</span>
          </div>
          <div className="flex h-6 w-fit items-center justify-center rounded-xl border border-[#E3E3E3] bg-[#E3E3E380]/50 px-2">
            <span className="text-base-900/60 text-caption-12M">정규직</span>
          </div>
        </div>
        {/*파란 테그 영역 (추천?)*/}
        <div className="flex items-center gap-x-1">
          <div className="flex h-6 w-fit items-center justify-center rounded-xl border border-[#B8D4FE] bg-[#DBEBFE] px-2">
            <span className="text-caption-12M text-[#3964D6]">Na:viK이 추천해요!</span>
          </div>
          <div className="flex h-6 w-fit items-center justify-center rounded-xl border border-[#B8D4FE] bg-[#DBEBFE] px-2">
            <span className="text-caption-12M text-[#3964D6]">당신에게 충분한 역량!</span>
          </div>
        </div>
      </div>
      <button className="text-caption-12B h-8 rounded-lg border border-[#4E83F9] py-1 font-bold text-[#4E83F9]">
        홈페이지 지원하기
      </button>
    </div>
  );
};

export default RecommandCard;
