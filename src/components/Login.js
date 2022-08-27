import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { routes, inputType } from '../constants';
import { Input } from '../shared-components/Input';
import { authApiClient } from '../utils/Api';

export function Login({ onLogin }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorMsgShown, setIsErrorMsgShown] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    authApiClient
      .signin(email, password)
      .then((signIn) => {
        if (signIn.token) {
          localStorage.setItem('token', signIn.token);
          onLogin(email);
          history.push(routes.MAIN);
        }
        setIsErrorMsgShown(false);
      })
      .catch((err) => {
        console.error(err);
        setIsErrorMsgShown(true);
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
          handleChange={handleChangeEmail}
          type={inputType.EMAIL}
        />
        <Input
          name="Пароль"
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
        {isErrorMsgShown && (
          <span className="entry__link">Что-то пошло не так</span>
        )}
      </form>
    </div>
  );
}
