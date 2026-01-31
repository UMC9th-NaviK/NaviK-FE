import { useNavigate } from 'react-router-dom';
import ButtonRound from '../common/ButtonRound';
import { getCategoryInfo } from '../../constants/category';

const CategoryIntro = ({ categoryId }: { categoryId: string }) => {
  const navigate = useNavigate();
  const categoryInfo = getCategoryInfo(categoryId);

  const handleNext = () => {
    navigate(`/setup/category/${categoryId}?step=2`);
  };

  if (!categoryInfo) {
    return null;
  }

  return (
    <div className="bg-white-background relative min-h-dvh overflow-hidden">
      <img
        src={`/images/category/${categoryId}-round.svg`}
        alt={categoryInfo.label}
        className="pointer-events-none absolute -top-40 right-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      {/* 하단 고정 영역 */}
      <div className="absolute right-0 bottom-0 left-0 z-20 pb-6">
        <div className="mb-8 flex flex-col gap-8 px-6">
          <div className="flex flex-col items-start gap-[10.8px]">
            <img src="/images/small-symbol-blue.svg" className="h-[41.4px] w-[41.6px]" />
            <img src="/icons/reports/logo-blue.svg" className="w-24.1 h-3.75" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-heading-24B text-base-900">나의 직무, 이렇게 시작해요</p>
            <p className={`text-body-eng-16SB ${categoryInfo.colorClass}`}>{categoryInfo.label}</p>
          </div>
          <p className="text-body-16M text-opacity-black-60">
            내 활동을 입력해&nbsp;
            <span className="text-base-600">커리어 나침반</span>을 완성해 보세요!
          </p>
        </div>
        <div className="px-4">
          <ButtonRound onClick={handleNext} text="시작하기" />
        </div>
      </div>
    </div>
  );
};

export default CategoryIntro;
