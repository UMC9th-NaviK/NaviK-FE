import { POLICY_CONTENT, type PolicyId } from '../../constants/policy';
import BackHeader from '../../components/common/BackHeader';

interface PolicyDetailViewProps {
  policyId: string;
}

const PolicyDetailView = ({ policyId }: PolicyDetailViewProps) => {
  const policy = POLICY_CONTENT[policyId as PolicyId];

  if (!policy) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-body-16M text-opacity-black-60">약관을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col gap-4 bg-white">
      <BackHeader title="약관 전체 보기" />
      <div className="flex flex-col gap-3 px-4 py-2">
        <div className="bg-gray-background flex flex-col gap-3 rounded-lg p-4">
          {policy.content.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <p className="text-body-14M text-opacity-black-60">{item.subtitle}</p>
              <p className="text-body-14R text-opacity-black-40">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-background flex flex-col gap-2 rounded-lg p-4">
          <p className="text-body-14M text-opacity-black-60">부칙</p>
          <p className="text-body-14R text-opacity-black-40">
            본 약관은 2026년 1월 ○일부터 시행합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailView;
