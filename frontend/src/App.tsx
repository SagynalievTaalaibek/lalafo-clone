import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import NotFound from './components/NotFound';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl" sx={{ mt: 1 }}>
          <Routes>
            <Route path="/" element={'Home'} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
