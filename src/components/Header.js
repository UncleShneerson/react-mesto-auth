import logo from "../images/mesto-logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип. Место. Россия." className="header__logo" />
    </header>
  );
}
