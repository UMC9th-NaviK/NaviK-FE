import { Navigate, type RouteObject } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import JobPage from '../pages/setup/JobPage';
import CategoryPage from '../pages/setup/CategoryPage';
import CategoryDetailPage from '../pages/setup/CategoryDetailPage';
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
import MyPageLayout from '../layouts/MyPageLayout';
import ProfilePage from '../pages/mypage/ProfilePage';
import CoreKPIPage from '../pages/report/CoreKPIPage';
import OvercomingKPIPage from '../pages/report/OvercomingKPIPage';
import CoreKPIDetailPage from '../pages/report/CoreKPIDetailPage';
import OvercomingKPIDetailPage from '../pages/report/OvercomingKPIDetailPage';
import SetupLayout from '../layouts/SetupLayout';
import EditProfilePage from '../pages/mypage/EditProfilePage';
import SettingPage from '../pages/mypage/SettingPage';
import RecommendedJobsPage from '../pages/mypage/RecommendedJobsPage';

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
          { path: 'core', element: <CoreKPIPage /> },
          { path: 'core/detail', element: <CoreKPIDetailPage role={'designer'} /> },
          { path: 'overcoming', element: <OvercomingKPIPage /> },
          { path: 'overcoming/detail', element: <OvercomingKPIDetailPage role={'pm'} /> },
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
      {
        path: '/mypage',
        element: <MyPageLayout />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'edit',
            element: <EditProfilePage />,
          },
          {
            path: 'setting',
            element: <SettingPage />,
          },
          {
            path: 'recommend',
            element: <RecommendedJobsPage />,
          },
        ],
      },
    ],
  },
];
