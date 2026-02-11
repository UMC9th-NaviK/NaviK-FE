export type ResponseNotice = {
  notificationId: number;
  content: string;
  createdAt: string;
  notificationType: 'RECRUITMENT' | 'GOAL' | 'STUDY';
  additionalInfoPerNotificationType: string;
  read: boolean;
};
