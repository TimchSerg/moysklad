import React from "react";
import { FieldRenderProps } from "react-final-form";

import styles from "../styles.module.css";
import { InputTextarea } from "primereact/inputtextarea";

type FieldPropsType = FieldRenderProps<string, any>;

export const TextAreaField = (props: FieldPropsType) => {
  const { meta, icon, input, label, settings } = props;

  return (
    <React.Fragment>
      <div
        className={`${styles.input} ${
          meta.error && meta.touched && styles.input_error
        }`}
      >
        <label>{label}</label>
        <div className={styles.inputWrapper}>
          <InputTextarea {...input} {...settings} autoResize />
          {icon && <i className={icon}></i>}
        </div>
        {meta.error && meta.touched && (
          <small className={styles.error}>{meta.error}</small>
        )}
      </div>
    </React.Fragment>
  );
}