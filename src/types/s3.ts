export type PathType = 'PORTFOLIO_PDF' | 'BOARD_IMAGE' | 'USER_PROFILE';

export type RequestPresignedUrl = {
  pathType: PathType;
  id: number;
  extension: string;
};

export type ResponsePresignedUrl = {
  preSignedUrl: string;
  key: string;
};
