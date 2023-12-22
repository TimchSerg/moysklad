import React from 'react';
import { locale, addLocale } from "primereact/api";
import { dataPickerSetting } from "shared/utils/settings";

import { ProgressBar } from 'primereact/progressbar';

import 'moment/locale/ru';

import './assets/styles/App.css';
import './assets/styles/index.css';
import './assets/styles/custom.css';
import './assets/styles/windows.css';
import './assets/styles/gallery.css';
import './assets/styles/dishes.css';

import "primeflex/themes/primeone-light.css";
import "primereact/resources/themes/fluent-light/theme.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';

import 'react-pro-sidebar/dist/css/styles.css';

import { Route, Routes } from 'react-router-dom';
import Login from 'features/auth/Login';
import { useCurrentMeQuery } from 'app/services/auth';
import { PrivateOutlet } from 'pages/PrivateOutlet';
import OrdersPage from 'pages/orders';

addLocale("ru", dataPickerSetting);
locale("ru");

const App:React.FC = () => {

  const { isLoading } = useCurrentMeQuery()
  
  return <>
    { isLoading  
      ? <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
      : (
          <Routes>
            <Route path="/login" element={<Login />} />
      
            <Route path="/" element={<PrivateOutlet />}>
              <Route path="orders" element={<OrdersPage />} ></Route>
            </Route>
          </Routes>
      )
    }
    
  </>
};

export default App;
