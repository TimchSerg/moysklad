import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Rating } from 'primereact/rating';

import styles from "../styles.module.css";

export function RatingField<T extends string>(props: FieldRenderProps<T, any>) {
  const { meta, label, input, settings} = props;

  return (
    <React.Fragment>
      <div
        className={`${styles.input} ${
          meta.error && meta.touched && styles.input_error
        }`}
      >
        <label>{label}</label>
        <div className={styles.inputWrapper}>
          <Rating cancel={false} stars={10} {...input} {...settings}/>
        </div>
        {meta.error && meta.touched && (
          <small className={styles.error}>{meta.error}</small>
        )}
      </div>
      
    </React.Fragment>
  );
}
