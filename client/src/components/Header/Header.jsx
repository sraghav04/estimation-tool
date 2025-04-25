import { FaUserCircle, FaBars } from "react-icons/fa";
import { Dropdown, Menu } from "antd";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={toggleSidebar}>
        Toggle Sidebar
      </Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="app-header">
      <Dropdown overlay={menu} trigger={["click"]}>
        <FaBars className="hamburger-icon" />
      </Dropdown>
      <div className="header-title">Estimation Tool</div>
      <FaUserCircle className="user-icon" />
    </div>
  );
};

export default Header;
