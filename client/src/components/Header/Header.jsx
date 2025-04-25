import { FaUserCircle, FaBars } from "react-icons/fa";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="app-header">
      <FaBars className="hamburger-icon" onClick={toggleSidebar} />
      <div className="header-title">My Application</div>
      <FaUserCircle className="user-icon" />
    </div>
  );
};

export default Header;
