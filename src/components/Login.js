import { routes, inputType } from '../constants';
import { Input } from '../shared-components/Input';
import { Header } from './Header';
import { InfoTooltip } from './InfoTooltip';

export function Login() {
  const handleChangeName = () => {};
  const handleChangeDescription = () => {};
  const onSubmit = () => {};

  return (
    <>
      {/* <InfoTooltip
        isOpened={true}
        onClose={onSubmit}
        isSuccess={true}
      /> */}
      <Header label="Регистрация" route={routes.SIGN_UP} />
      <div className="entry">
        <h2 className="entry__title">Вход</h2>
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
            value="Войти"
            className="entry__button"
            type="submit"
            title="Войти"
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
}
