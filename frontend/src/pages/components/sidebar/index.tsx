import React from 'react';
import { Link } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  // SubMenu,
  SidebarContent,
} from 'react-pro-sidebar';

import styles from './style.module.css';

interface ISidebarProps{
  collapsed: boolean;
  toggled: boolean;
  handleToggleSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

export const SidebarComponent: React.FC<ISidebarProps> = (props: any) => {
  const { collapsed, handleToggleSidebar, toggled } = props;

  return (
    <div className={`${styles.sidebar}`}>
      <ProSidebar 
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >

        <SidebarContent>
          <Menu >

            <MenuItem icon={<i className="pi pi-wallet "></i>}> 
              <Link  to={"/orders"}>Заказы покупателей</Link> 
            </MenuItem>

          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};