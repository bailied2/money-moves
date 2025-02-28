import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar_container">
        <a href="/" className="home_link">
          Money Moves Academy
        </a>
        <ul className="nav_list">
          <li>
            <a href="/dashboard" className="nav_link">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/profile" className="nav_link">
              Profile
            </a>
          </li>
          <li>
            <a href="/settings" className="nav_link">
              Settings
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
