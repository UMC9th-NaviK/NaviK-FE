import ButtonRound from '../common/ButtonRound';
import { useNavigate } from 'react-router-dom';

const SurveyStep = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(`/job/analysis`);
  };
  return (
    <>
      <p>진단 설문</p>
      {/* 버튼 - 하단 고정 */}
      <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-6">
        <ButtonRound onClick={handleNext} text="시작하기" />
      </div>
    </>
  );
};

export default SurveyStep;
