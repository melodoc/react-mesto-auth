import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { routes } from '../constants';
import { Layout } from './Layout';
import { Login } from './Login';
import { Register } from './Register';
import { ProtectedRoute } from './ProtectedRoute'; // импортируем HOC

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Switch>
      <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Layout} />
      <Route path={routes.SIGN_UP}>
        <Register />
      </Route>
      <Route path={routes.SIGN_IN}>
        <Login />
      </Route>
      <Route>
        {!loggedIn ? (
          <Redirect to={routes.SIGN_UP} />
        ) : (
          <Redirect to={routes.SIGN_IN} />
        )}
      </Route>
    </Switch>
  );
}

export default App;
