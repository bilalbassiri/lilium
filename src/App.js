import React from 'react';
import { LoginPage, Home } from './components';
import { useUserProfile } from './contexts/UserContext';
const App = () => {
  const userProfile = useUserProfile();
  const isAuthenticatedUser = userProfile !== null;

  return (
          <div className="App">
            {
              isAuthenticatedUser?
                <Home/>
                :
                <LoginPage />
            }
          </div>
  );
}

export default App;
