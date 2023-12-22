import React, { useState } from "react";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import TableOrders from "features/orders/table.orders";
import { useGetOrdersMutation } from "app/services/orders";
import OrderWin from "./view.orders";

export const OrdersPage: React.FC = () => {
  const [ currentId, setCurrentId ] = useState<string | null>(null)
  const [ visible, setVisible] = useState<boolean>(false)
  
  const [ getOrders ] = useGetOrdersMutation()

  const handleRefresh = () => getOrders(null);
  const handleViewing = (id: string) => {
    setCurrentId(id)
    setVisible(true)
  }

  return (
    <>

      <div className="col-12 px-0 py-1 flex flex-wrap align-items-baseline justify-content-between">
        <div className="flex flex-wrap">
          <Button label="Обновить" onClick={handleRefresh} className="p-button-raised p-button-info p-button-text ml-1"/>
        </div>
      </div>

      <ScrollPanel style={{ width: '100%', height: 'calc(100dvh - 200px)' }}>

        <div className="card">
          <TableOrders onViewing={handleViewing} />
        </div>

      </ScrollPanel>

      <OrderWin currentId={currentId} visible={visible} setVisible={setVisible} />
    </>
  );
}

export default OrdersPage;