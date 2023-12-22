import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from "./styles.module.css";
import { useUser } from 'hooks/useUser';


export const MobileHeader: React.FC = () => {
  const [name, setName] = useState("Главная")
  const { user } = useUser()
  const navigate = useNavigate();
  const location = useLocation();

  const onRedirect = () => navigate(-1)

  useEffect(()=>{
    if(location.pathname === '/') setName('Главная');
    if(location.pathname.includes('/restaurants')) setName('Заведения');
    if(location.pathname.includes('/account')) setName('Аккаунт');
    if(location.pathname.includes('/shopper')) setName('Тайный покупатель');
    if(location.pathname.includes('/settings')) setName('Настройки');
  },[location])

  return (
    <div className={styles.header}>
      
      {location.pathname !== '/' ? 
        <div className={styles.header_button} onClick={() => onRedirect()}>
          <i className="pi pi-angle-left" ></i>  
        </div>
        : <div className={styles.header_button} > </div>
      }
      

      <div className={styles.title}>
        {name}
      </div>

      <Link to={"/account"}>
        <div className={styles.header_button} >
          <img src={`/api/files/${user?.avatar}`} className={styles.avatar} onError={(e: any) => e.target.src='https://3raza.com/images/3_.png'} alt="avatar"></img>
        </div>
      </Link>
      

    </div>
  );
};

export default MobileHeader;