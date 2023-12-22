import React from 'react';

import { ConfirmDialog } from 'primereact/confirmdialog';

interface IProps {
  show: boolean;
  showWindow: (isShow: boolean) => void;
  item: any;
  deleteItem: () => void;
  text?: string;
}

export const DeleteWin: React.FC<IProps> = (props: any) => {
  const { show, showWindow, item, deleteItem, text } = props;

  const _text = text ? text : `Вы действительно хотите безвозвратно удалить элемент ${item?.name}?`

  const accept = () => deleteItem()
  const reject = () => {}

  return <ConfirmDialog visible={show} onHide={() => showWindow(false)} 
      message={_text}
      header="Предупреждение" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} 
      className="win-confirm win-confirm--warning"
    />
}

export default DeleteWin