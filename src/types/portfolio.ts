export type RequestPortfolio =
  | {
      inputType: 'TEXT';
      content: string;
    }
  | {
      inputType: 'PDF';
      fileUrl: string;
    };

export type ResponsePortfolio = {
  id: number;
  inputType: 'TEXT' | 'PDF';
  status: 'COMPLETED' | 'RETRY_REQUIRED' | 'FAILED';
};

export type RequestPortfolioInfo = {
  qB1: number;
  qB2: number;
  qB3: number;
  qB4: number;
  qB5: number;
};

export type PortfolioStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'RETRY_REQUIRED' | 'FAILED';

export type ResponsePortfolioStatus = {
  portfolioId: number;
  status: PortfolioStatus;
};

export type ResponseAdditionalInfo = {
  portfolioId: number;
};
