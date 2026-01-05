import { RouterProvider } from 'react-router-dom';
import MobileLayout from './layouts/MobileLayout';
import router from './routes';

const App = () => {
  return (
    <MobileLayout>
      <RouterProvider router={router} />
    </MobileLayout>
  );
};
export default App;
