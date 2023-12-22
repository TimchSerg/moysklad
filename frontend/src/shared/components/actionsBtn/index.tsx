import React, { useRef } from "react";

import { Menu } from "primereact/menu";
import { Button } from "primereact/button";


interface IProps {
  menuItems: Array<object>;
  popupId: string;
  className?: string;
}

export const ActionsBtn: React.FC<IProps> = (props: IProps) => {
  const {menuItems, popupId, className = ""} = props;
  const menu = useRef<Menu>(null);

  const handleClick = (event: any) => {
    event.preventDefault()
    if(menu && menu.current) menu.current.toggle(event)
  }

  return (
    <>
      <Menu model={menuItems} popup ref={menu} id={`popup_${popupId}`} />
      <Button className={`table-column--setting ${className}`} icon="pi pi-cog" onClick={handleClick} aria-controls={`popup_${popupId}`} aria-haspopup />
    </>
  );
};

export default ActionsBtn;
