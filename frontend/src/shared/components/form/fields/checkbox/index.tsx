import React from "react";
import { Checkbox } from "primereact/checkbox";
import { FieldRenderProps } from "react-final-form";

import styles from "../styles.module.css";

type FieldPropsType = FieldRenderProps<boolean, any>;

export const CheckboxField = (props: FieldPropsType) => {
  const { meta, input, onChange, inputId } = props;

  return (
    <React.Fragment>
      <Checkbox
        className={`${styles.checkboxButton} ${
          meta.error && styles.checkbox_error
        }`}
        onChange={(e) => {
          if (onChange) onChange(e);
          return input.onChange(e.checked);
        }}
        checked={!!input.value}
        inputId={inputId}
      />
      {/* {meta.error && meta.touched && (
        <small className={styles.error}>{meta.error}</small>
      )} */}
    </React.Fragment>
  );
}
