import { FaUserCircle, FaBars } from "react-icons/fa";
import { Dropdown, Menu } from "antd";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="app-header">
      <div className="header-title">Estimation Tool</div>
      <FaUserCircle className="user-icon" />
    </div>
  );
};

export default Header;
