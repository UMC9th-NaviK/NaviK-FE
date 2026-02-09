export type CategoryId = 'pm' | 'de' | 'fe' | 'be';

export const CATEGORY_TO_JOB_ID: Record<CategoryId, number> = {
  pm: 1,
  de: 2,
  fe: 3,
  be: 4,
} as const;

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  labelKo: string;
  colorClass: string;
  shadowClass: string;
}

export const CATEGORY_INFO: Record<CategoryId, CategoryInfo> = {
  pm: {
    id: 'pm',
    label: 'PRODUCT MANAGER',
    labelKo: 'PM',
    colorClass: 'text-gradient-pm',
    shadowClass: 'drop-shadow-[0_0_10px_#9A84FF]',
  },
  de: {
    id: 'de',
    label: 'PRODUCT DESIGNER',
    labelKo: 'DE',
    colorClass: 'text-gradient-de',
    shadowClass: 'drop-shadow-[0_0_10px_#FB9398]',
  },
  fe: {
    id: 'fe',
    label: 'FRONTEND DEVELOPER',
    labelKo: 'FE',
    colorClass: 'text-gradient-fe',
    shadowClass: 'drop-shadow-[0_0_10px_#F57CFC]',
  },
  be: {
    id: 'be',
    label: 'BACKEND DEVELOPER',
    labelKo: 'BE',
    colorClass: 'text-gradient-be',
    shadowClass: 'drop-shadow-[0_0_10px_#1EE1A1]',
  },
};

export const getCategoryInfo = (categoryId: string): CategoryInfo | undefined => {
  return CATEGORY_INFO[categoryId as CategoryId];
};
