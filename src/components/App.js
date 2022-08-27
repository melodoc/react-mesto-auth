import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { authApiClient } from '../utils/Api';
import { routes } from '../constants';
import { Layout } from './Layout';
import { Login } from './Login';
import { Register } from './Register';
import { ProtectedRoute } from './ProtectedRoute'; // импортируем HOC

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(false);
    authApiClient
      .checkValidity(localStorage.getItem('token'))
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.info(err);
      })
      .finally(() => {
        setIsLoggedIn(true);
      });
  }, []);

  return (
    <Switch>
      {isLoggedIn && (
        <ProtectedRoute
          exact
          path="/"
          loggedIn={isLoggedIn}
          component={Layout}
        />
      )}
      <Route path={routes.SIGN_UP}>
        <Register />
      </Route>
      <Route path={routes.SIGN_IN}>
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
