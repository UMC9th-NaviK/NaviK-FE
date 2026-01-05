import { Routes, Route } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';

import HomePage from '../pages/home/HomePage';

import OnboardingPage from '../pages/onboarding/OnboardingPage';
import LoginPage from '../pages/onboarding/LoginPage';

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

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/job" element={<JobLayout />}>
          <Route index element={<JobPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="category/:id" element={<CategoryDetailPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="result" element={<ResultPage />} />
        </Route>

        <Route path="/home" element={<HomePage />} />

        <Route path="/report" element={<ReportLayout />}>
          <Route index element={<ReportMainPage />} />
          <Route path="mycard" element={<MyCardPage />} />
          <Route path="growth" element={<GrowthMainPage />} />
          <Route path="growth/write" element={<GrowthWritePage />} />
          <Route path="growth/timeline" element={<TimelinePage />} />
        </Route>

        <Route path="/social" element={<SocialLayout />}>
          <Route path="board" element={<BoardPage />} />
          <Route path="board/:postId" element={<BoardDetailPage />} />
        </Route>
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
