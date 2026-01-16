import type { RouteObject } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import OnboardingPage from '../pages/onboarding/OnboardingPage';
import LoginPage from '../pages/onboarding/LoginPage';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'onboarding', element: <OnboardingPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
];
