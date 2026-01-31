import { useState, useMemo } from 'react';

interface UsePolicyAgreement {
  agreements: Record<string, boolean>;
  allChecked: boolean;
  handleToggleAll: () => void;
  handleToggleItem: (id: string) => void;
}

const POLICY_IDS = ['serviceTerms', 'serviceRestriction', 'contentPolicy', 'privacyPolicy'];

export function usePolicyAgreement(): UsePolicyAgreement {
  const [agreements, setAgreements] = useState<Record<string, boolean>>({
    serviceTerms: false,
    serviceRestriction: false,
    contentPolicy: false,
    privacyPolicy: false,
  });

  const allChecked = useMemo(() => {
    return POLICY_IDS.every((id) => agreements[id]);
  }, [agreements]);

  const handleToggleAll = () => {
    const newValue = !allChecked;
    setAgreements(
      POLICY_IDS.reduce(
        (acc, id) => {
          acc[id] = newValue;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
    );
  };

  const handleToggleItem = (id: string) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return { agreements, allChecked, handleToggleAll, handleToggleItem };
}
