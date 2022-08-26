import { Link } from 'react-router-dom';

import logo from '../images/icon/logo.svg';

export function Header({ entry }) {
  return (
    <header className="header">
      <a className="header__link" href="/">
        <img className="header__logo" src={logo} alt="Сайт Mesto" />
      </a>
      {entry && (
        <Link to={entry.route} className="header__button">
          {entry.label}
        </Link>
      )}
    </header>
  );
}
