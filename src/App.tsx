import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
