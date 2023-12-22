import React from "react";
import { SelectButton } from 'primereact/selectbutton';
import { FieldRenderProps } from "react-final-form";

import styles from "../styles.module.css";

type FieldPropsType = FieldRenderProps<boolean, any>;

export const SelectButtonField = (props: FieldPropsType) => {
  const { input, settings} = props;

  return (
    <React.Fragment>
      <SelectButton
        {...input} {...settings}
        className={`${styles.selectButton}`}
      />
    </React.Fragment>
  );
}
