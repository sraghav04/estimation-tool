import { Button } from "antd";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-buttons">
        <Link to="/features">
          <Button type="primary" block>
            Features Implementation
          </Button>
        </Link>
        <Button type="primary" block>
          <Link to="/test">Test Engineering</Link>
        </Button>
        <Button type="primary" block>
          <Link to="/require">Requirement Gathering</Link>
        </Button>
        <Button type="primary" block>
          <Link to="/dev">Additional Development</Link>
        </Button>
      </div>
      <div className="sidebar-result-btn">
        <Button type="dashed" block>
          Result
        </Button>
      </div>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "<" : ">"}
      </button>
    </div>
  );
};

export default Sidebar;
