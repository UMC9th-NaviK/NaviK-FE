export type RequestPortfolio = {
  inputType: 'TEXT' | 'FILE';
  content: string;
  fileUrl: string;
};

export type ResponsePortfolio = {
  id: number;
  inputType: 'TEXT' | 'FILE';
};
