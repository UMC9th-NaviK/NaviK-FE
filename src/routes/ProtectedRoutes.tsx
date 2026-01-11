import { Navigate, type RouteObject } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import JobPage from '../pages/job/JobPage';
import CategoryPage from '../pages/job/CategoryPage';
import CategoryDetailPage from '../pages/job/CategoryDetailPage';
import AnalysisPage from '../pages/job/AnalysisPage';
import ResultPage from '../pages/job/ResultPage';
import ReportMainPage from '../pages/report/ReportMainPage';
import MyCardPage from '../pages/report/MyCardPage';
import GrowthMainPage from '../pages/report/GrowthMainPage';
import GrowthWritePage from '../pages/report/GrowthWritePage';
import TimelinePage from '../pages/report/TimelinePage';
import BoardPage from '../pages/social/BoardPage';
import BoardDetailPage from '../pages/social/BoardDetailPage';
import JobLayout from '../layouts/JobLayout';
import ReportLayout from '../layouts/ReportLayout';
import SocialLayout from '../layouts/SocialLayout';
import SetupLayout from '../layouts/SetupLayout';

export const protectedRoutes: RouteObject[] = [
  {
    children: [
      { path: '/home', element: <HomePage /> },
      // 초기 설정 flow, 1회 접근 가능
      {
        path: '/setup',
        element: <SetupLayout />,
        children: [
          { index: true, element: <Navigate to="job" replace /> },
          { path: 'job', element: <JobPage /> },
          { path: 'category', element: <CategoryPage /> },
          { path: 'category/:id', element: <CategoryDetailPage /> },
        ],
      },
      {
        path: '/job',
        element: <JobLayout />,
        children: [
          { path: 'analysis', element: <AnalysisPage /> },
          { path: 'result', element: <ResultPage /> },
        ],
      },
      {
        path: '/report',
        element: <ReportLayout />,
        children: [
          { index: true, element: <ReportMainPage /> },
          { path: 'mycard', element: <MyCardPage /> },
          { path: 'growth', element: <GrowthMainPage /> },
          { path: 'growth/write', element: <GrowthWritePage /> },
          { path: 'growth/timeline', element: <TimelinePage /> },
        ],
      },
      {
        path: '/social',
        element: <SocialLayout />,
        children: [
          { path: 'board', element: <BoardPage /> },
          { path: 'board/:postId', element: <BoardDetailPage /> },
        ],
      },
    ],
  },
];
