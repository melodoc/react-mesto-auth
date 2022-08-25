import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { routes } from '../constants';
import { Layout } from './Layout';
import { Login } from './Login';
import { ProtectedRoute } from './ProtectedRoute'; // импортируем HOC

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Switch>
      <Route path={routes.SIGN_UP}>
        <div>Контейнер регистрации пользователя</div>
      </Route>
      <Route path={routes.SIGN_IN}>
        <Login />
      </Route>
      <ProtectedRoute path="/" loggedIn={loggedIn} component={Layout} />
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
