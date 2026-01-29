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

  return <></>;
};

export default CategoryIntro;
