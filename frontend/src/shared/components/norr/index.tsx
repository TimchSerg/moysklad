import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Toast } from 'primereact/toast';

import style from './style.module.css';

export type SeverityType = 'success' | 'info' | 'warn' | 'error';

interface IProps {
  show: boolean;
  severity: SeverityType;
  message: string;
}

export const Norr: React.FC<IProps> = (props: IProps) => {
  const {show, severity, message} = props;
  const toast = useRef<Toast>(null);

  const summary = (severity: string) => {
    if(severity === 'success') return 'Сообщение об успехе';
    if(severity === 'info') return 'Информационное сообщение';
    if(severity === 'warn') return 'Предупреждение';

    return 'Произошла ошибка';
  }

  const icon = (severity: string) => {
    if(severity === 'success') return 'pi pi-check';
    if(severity === 'info') return 'pi pi-info-circle';
    if(severity === 'warn') return 'pi pi-exclamation-triangle';

    return 'pi pi-times';
  };

  const content = useMemo(()=>(
    <div className="p-flex flex" style={{flex: '1'}}>
      <i className={`${icon(severity)} p-2 p-as-center`} style={{fontSize: '2rem'}}></i>
      <div className={style.content}>
        <h4>{summary(severity)}</h4>
        <p>{message}</p>
      </div>
    </div>
  ),[message, severity])

  const showSuccess = useCallback((show: boolean) => {
    if(show && toast && toast.current)
      toast.current.show({severity:severity, content: content, life: 5000});
  }, [severity, content])

  useEffect(()=> showSuccess(show), [show, showSuccess])

  return (
    <Toast ref={toast}  className={style.toast}/>
  );
}

export default Norr;
