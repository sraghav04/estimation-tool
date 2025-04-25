import { Button } from "antd";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-buttons">
        <Button type="primary" block>
          <Link to="/page1">Page 1</Link>
        </Button>
        <Button type="primary" block>
          <Link to="/page2">Page 2</Link>
        </Button>
        <Button type="primary" block>
          <Link to="/page3">Page 3</Link>
        </Button>
      </div>
      <div className="sidebar-result-btn">
        <Button type="dashed" block>
          Result
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
