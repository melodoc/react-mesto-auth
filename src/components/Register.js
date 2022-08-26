import { Link } from 'react-router-dom';

import { routes, inputType } from '../constants';
import { Input } from '../shared-components/Input';
import { Header } from './Header';

export function Register() {
  const handleChangeName = () => {};
  const handleChangeDescription = () => {};
  const onSubmit = () => {};

  return (
    <>
      <Header
        entry={{
          label: 'Войти',
          route: routes.SIGN_IN
        }}
      />
      <div className="entry">
        <h2 className="entry__title">Регистрация</h2>
        <form className="entry__form" name="entry__form" onSubmit={onSubmit}>
          <Input
            name="Email"
            handleChange={handleChangeName}
            type={inputType.EMAIL}
          />
          <Input
            name="Пароль"
            handleChange={handleChangeDescription}
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
            Уже зарегистрированы?
            <Link to={routes.SIGN_IN} className="entry__link_type_redirect">
              Войти
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
