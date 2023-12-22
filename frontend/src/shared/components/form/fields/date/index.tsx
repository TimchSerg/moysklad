import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { FieldRenderProps } from "react-final-form";

import styles from "../styles.module.css";
import { Dropdown } from "primereact/dropdown";

type FieldPropsType = FieldRenderProps<string, any>;

export const DateField = (props: FieldPropsType) => {
  const { meta, icon, input, label, settings } = props;
  const [updateKey, forceUpdate] = useState(1);
  const [ date, setDate ] = useState<string | null>(null);

  useEffect(() => {
    if (input.value.length) {
      setDate(input.value)
      forceUpdate( prev => prev + 1);
    }
  }, [input.value]);

  const monthNavigatorTemplate = (e: { value: any; options: any[] | undefined; onChange: (arg0: any, arg1: any) => void; }) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
  }

  const yearNavigatorTemplate = (e: { value: any; options: any[] | undefined; onChange: (arg0: any, arg1: any) => void; }) => {
      return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
  }

  return (
    <React.Fragment>
      <div
        className={`${styles.input} ${
          meta.error && meta.touched && styles.input_error
        }`}
        key={updateKey}
      >
        <label>{label}</label>
        <div 
          className={styles.inputWrapper}
        >
          <Calendar {...input} {...settings} style={{width: '100%'}} value={date ? new Date(date) : undefined} 
            yearRange={`1970:${new Date().getFullYear()}`}
            monthNavigator yearNavigator monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
          {icon && <i className={icon}></i>}
        </div>
        {meta.error && meta.touched && (
          <small className={styles.error}>{meta.error}</small>
        )}
      </div>
    </React.Fragment>
  );
}

export default DateField;