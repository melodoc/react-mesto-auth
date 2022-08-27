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
import { InfoTooltip } from './InfoTooltip';

function App() {
  const history = useHistory();

  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const [isTooltipSucceed, setIsTooltipSucceed] = useState(true);

  let token = localStorage.getItem('token');

  useEffect(() => {
    authApiClient
      .checkValidity(token)
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
        setIsTokenValid(true);
        history.push(routes.MAIN);
      })
      .catch((err) => {
        console.info(err);
        setIsTokenValid(false);
      });
  }, [token]);

  const handleHeaderEntry = () => {
    localStorage.removeItem('token');
    history.push(routes.SIGN_IN);
  };

  const handleClose = () => {
    setIsTooltipShown(false);
  };

  const handleRegisterSubmit = (email, password) => {
    authApiClient
      .signUp(email, password)
      .then((res) => {
        setIsTooltipShown(true);
        setIsTooltipSucceed(true);
        history.push(routes.SIGN_IN);
      })
      .catch((err) => {
        setIsTooltipShown(true);
        setIsTooltipSucceed(false);
        console.error(err);
      });
  };

  const handleLoginSubmit = (email, password) => {
    authApiClient
      .signIn(email, password)
      .then((signIn) => {
        if (signIn.token) {
          localStorage.setItem('token', signIn.token);
          token = signIn.token;
          setEmail(email);
          setLoggedIn(true);
          history.push(routes.MAIN);
        }
      })
      .catch((err) => {
        setIsTooltipShown(true);
        setIsTooltipSucceed(false);
        console.error(err);
      });
  };

  return (
    <div className="page">
      <InfoTooltip
        isOpened={isTooltipShown}
        onClose={handleClose}
        isSuccess={isTooltipSucceed}
      />
      <Header
        email={email}
        onSignOut={handleHeaderEntry}
        loggedIn={loggedIn}
      />
      <Switch>
        <Route path={routes.SIGN_UP}>
          <Register onSubmit={handleRegisterSubmit} />
        </Route>
        <Route path={routes.SIGN_IN}>
          <Login onLogin={handleLoginSubmit} />
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
