import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';

import { authApiClient } from '../utils/Api';
import { routes } from '../constants';
import { Layout } from './Layout';
import { Login } from './Login';
import { Register } from './Register';
import { Header } from './Header';
import { ProtectedRoute } from './ProtectedRoute'; // импортируем HOC

function App() {
  const history = useHistory();

  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setIsTokenValid(false);
    authApiClient
      .checkValidity(localStorage.getItem('token'))
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setIsTokenValid(false);
        }
      })
      .then((res) => {
        console.info(res);
        setEmail(res.data.email);
        setLoggedIn(true);
        setIsTokenValid(true);
        history.push(routes.MAIN);
      })
      .catch((err) => {
        console.info(err);
        setIsTokenValid(false);
      });
  }, []);

  const handleHeaderEntry = () => {
    localStorage.removeItem('token');
    history.push(routes.SIGN_IN);
  };

  const handleLogin = (email) => {
    setEmail(email);
    setLoggedIn(true);
  };

  return (
    <div className="page">
      <Header
        email={email}
        onSignOut={handleHeaderEntry}
        loggedIn={loggedIn}
      />
      <Switch>
        <Route path={routes.SIGN_UP}>
          <Register />
        </Route>
        <Route path={routes.SIGN_IN}>
          <Login onLogin={handleLogin} />
        </Route>
        {!isTokenValid ? (
          <Redirect to={routes.SIGN_IN} />
        ) : (
          <ProtectedRoute
            exact
            path="/"
            loggedIn={isTokenValid}
            component={Layout}
          />
        )}
      </Switch>
    </div>
  );
}

export default App;
