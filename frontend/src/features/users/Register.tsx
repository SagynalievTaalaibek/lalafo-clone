import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Avatar, Container, Grid, Link, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { selectRegisterError, selectRegisterLoading } from './usersSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { RegisterMutation } from '../../types';

const Register = () => {
  const registerLoading = useAppSelector(selectRegisterLoading);
  const registerError = useAppSelector(selectRegisterError);
  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName: '',
    phone: '',
  });

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      /*await dispatch(register(state)).unwrap();
      navigate('/');*/

      console.log(state);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                value={state.username}
                onChange={inputChangeHandler}
                autoComplete="new-username"
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={state.password}
                autoComplete="new-password"
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="displayName"
                label="Diplay name"
                required
                value={state.displayName}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                label="Phone"
                required
                type="tel"
                value={state.phone}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={registerLoading}
            loading={registerLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
