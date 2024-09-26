import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/lading-page';
import Logging from './pages/logging';
import Forms from './pages/form';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/forms',
    element: <Forms />,
  },
  {
    path: '/login',
    element: <Logging />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>,
);
