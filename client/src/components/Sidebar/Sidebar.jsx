import { Button } from "antd";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-buttons">
        <Button type="primary" block>
          <Link to="/page1">Features Implementation</Link>
        </Button>
        <Button type="primary" block>
          <Link to="/page2">Test Engineering</Link>
        </Button>
        <Button type="primary" block>
          <Link to="/page3">Requirement Gathering</Link>
        </Button>
        <Button type="primary" block>
          <Link to="/page3">Additional Development</Link>
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
