import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Layout } from './Layout';
import { ProtectedRoute } from './ProtectedRoute'; // импортируем HOC

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Switch>
      <Route path="/sign-up">
        <div>Контейнер регистрации пользователя</div>
      </Route>
      <Route path="/sign-in">
        <div>Контейнер авторизации пользователя</div>
      </Route>
      <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={Layout}
        />
      <Route>
        {!loggedIn ? <Redirect to="/sign-up" /> : <Redirect to="/sign-in" />}
      </Route>
    </Switch>
  );
}

export default App;
