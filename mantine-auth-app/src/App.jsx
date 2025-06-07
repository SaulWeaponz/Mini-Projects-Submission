// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AppShell, Group, Text, Button } from '@mantine/core'; // <--- REMOVE Header from here
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function App() {
  const { logout, isAuthenticated, user } = useAuth0();
  // const navigate = useNavigate();

  const handleLocalLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const isLoggedIn = isAuthenticated || localStorage.getItem('currentUser');

  return (
    <AppShell
      // Header is now a direct prop/child of AppShell, not a separate component import
      header={{
        // In Mantine v6/v7, header is an object prop to AppShell
        height: 60,
        // You directly define the content for the header here:
        children: (
          <Group h="100%" px="md" justify="space-between"> {/* Use h="100%" instead of style={{ height: '100%' }} for Mantine */}
            <Text size="xl" fw={700}>Auth App</Text> {/* Use fw={700} instead of weight={700} for Mantine v6/v7 */}
            <Group>
              {!isLoggedIn && <Button onClick={() => navigate('/signup')}>Signup</Button>}
              {!isLoggedIn && <Button onClick={() => navigate('/login')}>Login</Button>}
              {isAuthenticated && (
                <>
                  <Text>{user?.name || user?.email}</Text>
                  <Button
                    onClick={() =>
                      logout({ logoutParams: { returnTo: window.location.origin } })
                    }
                  >
                    Auth0 Log out
                  </Button>
                </>
              )}
              {localStorage.getItem('currentUser') && !isAuthenticated && (
                <Button onClick={handleLocalLogout}>Local Log out</Button>
              )}
            </Group>
          </Group>
        ),
      }}
      padding="md"
    >
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </AppShell>
  );
}

export default App;