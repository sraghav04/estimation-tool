import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
// import Upload from "../../components/Upload/Upload.jsx";
import Chat from "../../components/Chat/Chat.jsx";
// import Sidebar from "../../components/Sidebar/Sidebar.jsx";

const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className="main-content"
        style={{
          marginLeft: isSidebarOpen ? 200 : 0,
          marginTop: 60,
          padding: 20,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Homepage;
