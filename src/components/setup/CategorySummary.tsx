import { useNavigate } from 'react-router-dom';
import ButtonRound from '../common/ButtonRound';

const CategorySummary = ({ categoryId }: { categoryId: string }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(`/setup/category/${categoryId}?step=3`);
  };

  return (
    <>
      직무 요약
      {/* 버튼 - 하단 고정 */}
      <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-6">
        <ButtonRound onClick={handleNext} text="다음" />
      </div>
    </>
  );
};

export default CategorySummary;
