import React, { useEffect, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { FieldRenderProps } from "react-final-form";

import styles from "../styles.module.css";

export function IsOneField<T extends boolean | string>(props: FieldRenderProps<T, any>) {
  const [ selected, setSelected ] = useState<boolean | null>(null);
  const [ answers, setAnswer ] = useState<any[]>([]);
  const { meta, input, label, disabled = false, style = {}, variants = "", commentBy = "" } = props;

  useEffect(()=> {
    if(selected !== null) return input.onChange(selected)
    if(input.value !== "")  return input.onChange(input.value);
    
  }, [input, selected]);

  useEffect(()=> {
    const answer = variants.split(" #:")
    const comments = commentBy.split(" #:")
    const arr = [] as any[]
    answer.forEach( (a: any, index: number) => {
      arr.push({ id: index, value: a, comment: comments[index] === 'true' })
    })
    
    setAnswer(arr)
  }, [variants, commentBy]);

  return (
    <div className={`${styles.radioButton} ${styles.input} ${
      meta.error && meta.touched && styles.input_error
    }`} style={style}>
      <label>{label}</label>

      <div className="col-12 p-0 flex">

        {answers.map( (answer: any) => (
          <div className="pr-2 pt-2 pb-0 flex" key={answer.id}>
            <RadioButton
              inputId={input.name + answer.value}
              onChange={(e) => {
                setSelected(answer.value)
              }}
              checked={ input.value !== "" ? input.value === answer.value : selected === answer.value }
              disabled={disabled}
            />
            <label htmlFor={input.name + answer.value} className="ml-2" style={{ cursor: 'pointer' }}>{answer.value}</label>
          </div>
        ) )}
        
      </div>
      {meta.error && meta.touched && (
          <small className={styles.error}>{meta.error}</small>
        )}
    </div>
  );
}
