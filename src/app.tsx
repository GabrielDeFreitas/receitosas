import { Container } from './components/Container';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { RecipeForm } from './components/RecipeForm';
import { HowWorks } from './components/HowWorks';

export default function App() {
  return (
    <Container>
      <Header />
      <RecipeForm />
      <HowWorks />
      <FAQ />
      <Footer />
    </Container>
  );
}
