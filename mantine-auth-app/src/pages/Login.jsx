import React from 'react';
import { TextInput, PasswordInput, Button, Box, Paper, Title, Text, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 1 ? 'Password is required' : null), // Basic validation
    },
  });

  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(
      user => user.email === values.email && user.password === values.password
    );

    if (foundUser) {
      // Set current user in localStorage (for local login persistence)
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      showNotification({
        title: 'Login Successful!',
        message: `Welcome back, ${foundUser.fullName}!`,
        color: 'green',
      });
      navigate('/dashboard');
    } else {
      showNotification({
        title: 'Login Failed',
        message: 'Invalid email or password.',
        color: 'red',
      });
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dashboard', // Redirect to dashboard after Google login
      },
      authorizationParams: {
        screen_hint: 'signup', 
      }
    });
  };

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto" mt="xl">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} align="center" mb="lg">Login</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="xl">
            Log In
          </Button>
        </form>

        <Divider my="lg" label="OR" labelPosition="center" />

        <Button
          fullWidth
          variant="outline"
          leftIcon={<img src="https://www.auth0.com/static/auth0-logo-icon.svg" alt="Auth0" width={20} />} 
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>

        <Text align="center" mt="md">
          Don't have an account?{' '}
          <Text component="a" href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
            Sign up
          </Text>
        </Text>
      </Paper>
    </Box>
  );
};

export default Login;