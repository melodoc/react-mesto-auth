import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { routes, inputType } from '../constants';
import { Input } from '../shared-components/Input';
import { authApiClient } from '../utils/Api';

export function Login({ onLogin }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    authApiClient
      .signIn(email, password)
      .then((signIn) => {
        if (signIn.token) {
          localStorage.setItem('token', signIn.token);
          onLogin(email);
          history.push(routes.MAIN);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="entry">
      <h2 className="entry__title">Вход</h2>
      <form
        className="entry__form"
        name="entry__form"
        onSubmit={onSubmit}
      >
        <Input
          name="Email"
          value={email}
          handleChange={handleChangeEmail}
          type={inputType.EMAIL}
        />
        <Input
          name="Пароль"
          value={password}
          handleChange={handleChangePassword}
          type={inputType.PASSWORD}
        />
        <button
          value="Войти"
          className="entry__button"
          type="submit"
          title="Войти"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
