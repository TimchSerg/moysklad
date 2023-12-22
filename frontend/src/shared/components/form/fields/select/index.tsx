import React from "react";
import { Dropdown } from 'primereact/dropdown';
import { FieldRenderProps } from "react-final-form";

import styles from "../styles.module.css";

type FieldPropsType = FieldRenderProps<string, any>;

export const SelectField = (props: FieldPropsType) => {
  const { meta, input, label, settings } = props;

  return (
    <React.Fragment>
      <div
        className={`${styles.input} ${
          meta.error && meta.touched && styles.input_error
        }`}
      >
        <label>{label}</label>
        <div className={styles.inputWrapper}>
          <Dropdown {...input} {...settings} className={styles.dropdown}/>
        </div>
        {meta.error && meta.touched && (
          <small className={styles.error}>{meta.error}</small>
        )}
      </div>
    </React.Fragment>
  );
}