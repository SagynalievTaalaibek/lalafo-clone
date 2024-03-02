import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import NotFound from './components/NotFound';

const App = () => {
  const user = useAppSelector(selectUser);

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
            <Route path="/login" element={<Login />} />
            {user ? <Route path="/add-new-item" element={'New Item'} /> : ''}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
