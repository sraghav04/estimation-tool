import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
// import Upload from "../../components/Upload/Upload.jsx";
import Chat from "../../components/Chat/Chat.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane.js";

const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const tabItems = [
    { key: "/features", label: "Features Implementation" },
    { key: "/test", label: "Test Engineering" },
    { key: "/require", label: "Requirement Gathering" },
    { key: "/dev", label: "Additional Development" },
  ];

  const activeKey =
    tabItems.find((tab) => location.pathname.startsWith(tab.key))?.key ||
    "/features";

  const onTabChange = (key) => {
    navigate(key);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className="main-content"
        style={{
          marginLeft: isSidebarOpen ? 300 : 0,
          padding: 20,
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Tabs Below Header */}
        <Tabs activeKey={activeKey} onChange={onTabChange}>
          {tabItems.map((tab) => (
            <TabPane tab={tab.label} key={tab.key} />
          ))}
        </Tabs>

        <Outlet />
      </div>
    </>
  );
};

export default Homepage;
