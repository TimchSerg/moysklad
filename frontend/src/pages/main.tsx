import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { SidebarComponent } from "./components/sidebar";

export const Main: React.FC = (props: any) => {
  const [ visSidebar, setVisSidebar ] = useState(true);
  const [ toggled, setToggle ] = useState(false);
  
  const handleSidebar = () => {
    setVisSidebar(!toggled ? false : !visSidebar)
    setToggle(true)
  };
  const handleToggleSidebar = () => {
    setVisSidebar(true)
    setToggle(!toggled)
  }

  return (
    <>
      <Header 
        handleSidebar = { handleSidebar }
      />

      <div className="private-main">
      
        <SidebarComponent 
          collapsed={visSidebar}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />

        <div className="p-2 main-page">
          <Outlet />
        </div>

      </div>
    </>
  );
}

export default Main;