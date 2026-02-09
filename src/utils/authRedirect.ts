import type { NavigateFunction } from 'react-router-dom';
import type { UserStatus } from '../types/auth';

export const redirectByUserStatus = (status: UserStatus, navigate: NavigateFunction): void => {
  if (status === 'PENDING') {
    navigate('/onboarding?step=1', { replace: true });
    return;
  }

  if (status === 'ACTIVE') {
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    localStorage.removeItem('redirectAfterLogin');
    const finalPath = redirectPath || '/home';
    navigate(finalPath, { replace: true });
    return;
  }

  console.error('Unknown user status:', status);
  navigate('/login', { replace: true });
};
