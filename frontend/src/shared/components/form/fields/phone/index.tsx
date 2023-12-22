import React from "react";
import { InputMask } from "primereact/inputmask";
import { FieldRenderProps } from "react-final-form";

type FieldPropsType = FieldRenderProps<string, any>;

export const PhoneField = (props: FieldPropsType) =>  {
  const { meta, input, onChange, settings } = props;
  
  return (
    <InputMask
      {...input}
      {...settings}
      mask="+79999999999"
      placeholder="+79000000000"
      onChange={(event: { value: any; }, value: any) => {
        if (onChange) onChange(event);
        return input.onChange(event.value);
      }}
      errorText={meta.touched ? meta.error : ""}
    />
  );
}

export default PhoneField;
