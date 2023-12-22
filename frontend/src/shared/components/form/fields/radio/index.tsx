import React from "react";
import { RadioButton } from "primereact/radiobutton";
import { FieldRenderProps } from "react-final-form";

import styles from "../styles.module.css";

export function RadioField<T extends string>(props: FieldRenderProps<T, any>) {
  const { meta, input, inputId } = props;

  return (
    <React.Fragment>
      <RadioButton
        inputId={inputId}
        className={`${styles.radioButton} ${
          meta.error && meta.touched && styles.radio_error
        }`}
        onChange={(e) => input.onChange(e.checked)}
        checked={!!input.value}
      />
    </React.Fragment>
  );
}
