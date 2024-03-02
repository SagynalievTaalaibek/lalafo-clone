import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>Navbar</header>
      <main>
        <Container maxWidth="xl" sx={{ mt: 1 }}>
          <Routes>
            <Route path="/" element={'Home'} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
