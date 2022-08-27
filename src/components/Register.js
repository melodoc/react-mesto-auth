import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { routes, inputType } from '../constants';
import { Input } from '../shared-components/Input';
import { authApiClient } from '../utils/Api';
import { InfoTooltip } from './InfoTooltip';

export function Register() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const [isTooltipSucceed, setIsTooltipSucceed] = useState(true);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClose = () => {
    setIsTooltipShown(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

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

  return (
    <>
      <InfoTooltip
        isOpened={isTooltipShown}
        onClose={onClose}
        isSuccess={isTooltipSucceed}
      />
      <div className="entry">
        <h2 className="entry__title">Регистрация</h2>
        <form
          className="entry__form"
          name="entry__form"
          onSubmit={onSubmit}
        >
          <Input
            name="Email"
            handleChange={handleChangeEmail}
            value={email}
            type={inputType.EMAIL}
          />
          <Input
            name="Пароль"
            value={password}
            handleChange={handleChangePassword}
            type={inputType.PASSWORD}
          />
          <button
            value="Зарегистрироваться"
            className="entry__button"
            type="submit"
            title="Зарегистрироваться"
          >
            Зарегистрироваться
          </button>
          <span className="entry__link">
            Уже зарегистрированы?&nbsp;
            <Link
              to={routes.SIGN_IN}
              className="entry__link_type_redirect"
            >
              Войти
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
