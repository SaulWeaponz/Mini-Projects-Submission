import React, { useEffect, useState } from 'react';
import { Box, Title, Text, Paper } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
  const { user: auth0User, isAuthenticated: auth0IsAuthenticated, isLoading: auth0IsLoading } = useAuth0();
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    // Check for locally stored user if Auth0 isn't authenticated
    if (!auth0IsAuthenticated) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setLocalUser(JSON.parse(storedUser));
      }
    }
  }, [auth0IsAuthenticated]);

  if (auth0IsLoading) {
    return <Box sx={{ maxWidth: 600 }} mx="auto" mt="xl"><Text>Loading user data...</Text></Box>;
  }

  return (
    <Box sx={{ maxWidth: 600 }} mx="auto" mt="xl">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} align="center" mb="lg">Dashboard</Title>
        {(auth0IsAuthenticated && auth0User) ? (
          <Box>
            <Text size="lg">Welcome back, {auth0User.name || auth0User.email}!</Text>
            <Text>Your Auth0 ID: {auth0User.sub}</Text>
            {auth0User.picture && <img src={auth0User.picture} alt="User" style={{ borderRadius: '50%', marginTop: '15px' }} />}
            {/* <pre>{JSON.stringify(auth0User, null, 2)}</pre> */}
            <ul>
              {Object.keys(auth0User).map((objKey, i)=><li key={i}>{objKey}: {auth0User[objKey]}</li>)}
            </ul>
          </Box>
        ) : localUser ? (
          <Box>
            <Text size="lg">Welcome back, {localUser.fullName}!</Text>
            <Text>You are logged in via local storage.</Text>
            <Text>Your email: {localUser.email}</Text>
          </Box>
        ) : (
          <Text>You are on the Dashboard, but user details are not available. Please log in.</Text>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;