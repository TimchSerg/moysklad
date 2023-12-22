import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmPopup } from 'primereact/confirmpopup';

import styles from "./styles.module.css";
import { useUser } from 'hooks/useUser';
import { logout } from 'features/auth/slice'
import { useDispatch } from 'react-redux';
import Logotype from 'shared/components/logotype';

interface IHeaderProps{
  handleSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const { handleSidebar } = props;
  const [visible, setVisible] = useState(false);
  const { user } = useUser()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogotype = () => navigate("/")
  const handleLogout = () => dispatch(logout())
  

  return (
    <div className={styles.header}>
      <div className={styles.header_button} onClick={handleSidebar}>
        <i className="pi pi-bars"></i>
      </div>

      <div className={styles.position}>
        <div className={styles.logo} onClick={handleLogotype}>
          <Logotype className='' />  
        </div>

        <div className={`${styles.account} hidden md:block`}>
          {user && <span>{user.name}</span>}
        </div>

      </div>

      <ConfirmPopup 
        target={document.getElementById('logout') as any} 
        visible={visible} 
        onHide={() => setVisible(false)} 
        message="Вы действительно хотите выйти?"
        icon="pi pi-exclamation-triangle" 
        accept={handleLogout} 
        reject={()=>{}} 
      />

      <div className={styles.header_button} id="logout" onClick={() => setVisible(true)}>
        <i className="pi pi-sign-out" ></i>
      </div>

    </div>
  );
};

export default Header;