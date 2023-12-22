import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

interface IProps {
  label: string;
  value: string | null;
  mergeValue: string | null;
  className?: string;
}

export const MergeString: React.FC<IProps> = (props: IProps) => {
  let { label, value, mergeValue, className = "flex flex-column col-12" } = props;

  if(value === null) value = "";
  if(mergeValue === null) mergeValue = "";

  const mergeClassNameOld = classNames('col-12 md:col-6', {
    [styles.old]: value !== mergeValue,
    [styles.no_changes]: value === mergeValue
  });

  const mergeClassNameNew = classNames('col-12 md:col-6', {
    [styles.new]: value !== mergeValue,
    [styles.no_changes]: value === mergeValue
  })

  return (
    <div className={className + ' ' + styles.merge}>
      <label> {label} </label>
      <div className={`${styles.merge_value} flex flex-wrap`}>
        <div className={mergeClassNameOld}> 
          <span> {value} </span> 
        </div>
        <div className={mergeClassNameNew}>
          <span> {mergeValue} </span> 
        </div>
      </div>
    </div>
  );
}