import { Button } from "antd";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Chat from "../Chat/Chat";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <Chat />
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "<" : ">"}
      </button>
    </div>
  );
};

export default Sidebar;
