import { useNavigate } from 'react-router-dom';
import BackHeader from '../../components/common/BackHeader';
import ButtonSquare from '../../components/common/ButtonSquare';
import PolicyItem from '../../components/onboarding/PolicyItem';
import PolicyAllAgree from '../../components/onboarding/PolicyAllAgree';
import { usePolicyAgreement } from '../../hooks/usePolicyAgreement';
import { POLICIES } from '../../constants/policy';

const PolicyPage = () => {
  const navigate = useNavigate();
  const { agreements, allChecked, handleToggleAll, handleToggleItem } = usePolicyAgreement();

  const handleViewPolicy = (policyId: string) => {
    navigate(`/onboarding?step=1&detail=${policyId}`);
  };

  const handleNext = () => {
    navigate('/onboarding?step=2');
  };

  return (
    <>
      <BackHeader title="이용 약관" />
      <div className="flex flex-col items-center">
        <p className="text-base-900 text-heading-20B py-8.25 text-center">
          서비스 이용을 위해
          <br />
          약관 동의가 필요해요
        </p>
        <div className="flex w-full flex-col px-4 pb-24">
          <div className="flex flex-col gap-4">
            <PolicyAllAgree checked={allChecked} onToggle={handleToggleAll} />

            <div className="flex flex-col">
              {POLICIES.map((policy) => (
                <PolicyItem
                  key={policy.id}
                  id={policy.id}
                  title={policy.title}
                  checked={agreements[policy.id as keyof typeof agreements]}
                  onToggle={handleToggleItem}
                  onView={handleViewPolicy}
                />
              ))}
            </div>
          </div>
          <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-6">
            <ButtonSquare onClick={handleNext} text="다음" disabled={!allChecked} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyPage;
