import React from "react";
import styles from "./style.module.css";

export const ExpansionIcon: React.FC<any> = (props: any) => {
  const { active, setActive, className } = props;
  const onClick = () => {
    setActive(!active);
  };

  return (
    <div
      className={`${styles.icon} ${className}`}
      onClick={onClick}
    >
      <i className="pi pi-angle-up"></i>
    </div>
  );
}

export const ExpansionItem: React.FC<any> = (props: any) => {
  return (
    <div
      className={`${props.className} ${styles.item} ${
        props.active ? styles.itemActive : ""
      }`}
    >
      {props.withLine && <div className={styles.line}></div>}

      {props.children}
    </div>
  );
}
