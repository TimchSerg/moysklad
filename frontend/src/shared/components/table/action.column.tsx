import React, { useRef } from "react";

import { Menu } from "primereact/menu";
import { Button } from "primereact/button";


interface IProps {
  element: {id: string};
  setElement?: () => void;
  menuItems: Array<object>;
}

export const ActionsColumn: React.FC<IProps> = (props: IProps) => {
  const {element, setElement, menuItems} = props;
  const menu = useRef<Menu>(null);

  const handleClick = (event: any) => {
    if(menu && menu.current) menu.current.toggle(event)
    if(setElement) setElement()
  }

  return (
    <>
      <Menu model={menuItems} popup ref={menu} id={`popup_${element.id}`} />
      <Button className="table-column--setting" icon="pi pi-cog" onClick={handleClick} aria-controls={`popup_${element.id}`} aria-haspopup />
    </>
  );
};

export default ActionsColumn;
