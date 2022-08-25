import logo from '../images/icon/logo.svg';

export function Header({ label, route }) {
  return (
    <header className="header">
      <a className="header__link" href=".">
        <img className="header__logo" src={logo} alt="Сайт Mesto" />
      </a>
      <a className="header__button" href=".">{label}</a>
    </header>
  );
}
