import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { RecipeForm } from './pages/RecipeForm';
import { Login } from './pages/Login';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { HowWorks } from './components/HowWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

// compartilhe e publique suas receitas

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/recipe-form',
    element: <RecipeForm />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Container>
      <Header />
      <RouterProvider router={router} />
      <HowWorks />
      <FAQ />
      <Footer />
    </Container>
  </StrictMode>,
);
