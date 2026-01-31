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
import SocialTabLayout from '../layouts/SocialTabLayout';
// import BoardEditPage from '../pages/social/BoardEditPage';
import EvaluationPage from '../pages/social/EvaluationPage';
import MyEvaluationPage from '../pages/social/MyEvaluationPage';
// import StudyEvaluationPage from '../pages/social/StudyEvaluationPage';
// import StudyRecommendPage from '../pages/social/StudyRecommendPage';
// import NewStudyPage from '../pages/social/NewStudyPage';
// import StudyLayout from '../layouts/StudyLayout';
// import MyStudyLayout from '../layouts/MyStudyLayout';
// import MyParticipatingPage from '../pages/social/MyParticipatingPage';
// import MyOperatingPage from '../pages/social/MyOperatingPage';
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
import NoticePage from '../pages/home/NoticePage';

export const protectedRoutes: RouteObject[] = [
  {
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/notice', element: <NoticePage /> },
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
          {
            element: <SocialTabLayout />,
            children: [
              { index: true, element: <Navigate to="study/recommend" replace /> },
              {
                path: 'study',
                // element: <StudyLayout />,
                children: [
                  { index: true, element: <Navigate to="recommend" replace /> },
                  {
                    path: 'recommend',
                    // element: <StudyRecommendPage />,
                  },
                  {
                    path: 'new',
                    // element: <NewStudyPage />,
                  },
                  {
                    path: 'my',
                    // element: <MyStudyLayout />,
                    children: [
                      { index: true, element: <Navigate to="participate" replace /> },
                      // { path: 'participate', element: <MyParticipatingPage /> },
                      // { path: 'operate', element: <MyOperatingPage /> },
                    ],
                  },
                ],
              },
              { path: 'board', element: <BoardPage /> },
              { path: 'evaluation', element: <EvaluationPage /> },
            ],
          },
          { path: 'board/:postId', element: <BoardDetailPage /> },
          // { path: 'board/:postId/edit', element: <BoardEditPage /> },
          { path: 'evaluation/my', element: <MyEvaluationPage /> },
          // { path: 'study/evaluation', element: <StudyEvaluationPage /> },
        ],
      },
      {
        path: '/mypage',
        element: <MyPageLayout />,
        children: [
          {
            index: true,
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
