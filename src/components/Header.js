import logo from '../images/icon/logo.svg';

export function Header() {
  return (
    <header className="header">
      <a className="header__link" href=".">
        <img className="header__logo" src={logo} alt="Сайт Mesto" />
      </a>
    </header>
  );
}
