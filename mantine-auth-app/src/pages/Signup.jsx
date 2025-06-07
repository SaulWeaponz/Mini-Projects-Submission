import React from 'react';
import { TextInput, PasswordInput, Button, Box, Paper, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validate: {
      fullName: (value) => (value.trim().length < 2 ? 'Full name must have at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = (values) => {
    // Check if email already exists in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === values.email);

    if (userExists) {
      showNotification({
        title: 'Signup Failed',
        message: 'A user with this email already exists.',
        color: 'red',
      });
      return;
    }

    // Securely store (in a real app, hash password and send to backend)
    // For this simple example, we store plain text (NOT SECURE FOR PROD)
    const newUser = {
      id: Date.now(), // Simple unique ID
      fullName: values.fullName,
      email: values.email,
      password: values.password, // IMPORTANT: In a real app, hash this password!
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    showNotification({
      title: 'Signup Successful!',
      message: 'You can now log in.',
      color: 'green',
    });
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto" mt="xl">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} align="center" mb="lg">Sign Up</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            {...form.getInputProps('fullName')}
          />
          <TextInput
            label="Email"
            placeholder="your@email.com"
            mt="md"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="xl">
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;