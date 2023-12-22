import React, { useEffect } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMediaQuery } from "react-responsive";
import { useOrders } from "hooks/useOrders";
import { useGetOrdersMutation } from "app/services/orders";
import { Button } from "primereact/button";
import { orderBy } from "lodash";
import { toDateNoTime } from "shared/utils/toDate.util";

interface IProps {
  onViewing: (id: string) => void;
}

export const TableOrders: React.FC<IProps> = (props: any) => {
  const { onViewing } = props;
  const { orders } = useOrders()
  const [ getOrders, { isLoading } ] = useGetOrdersMutation()
  
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  })

  useEffect(() => { getOrders(null) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleViewing = (id: string) => { onViewing(id) }

  const action = (rowData: any) => (
    <div className="col-12 p-0 flex justify-content-end">
      <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info " onClick={() => handleViewing(rowData.id)}></Button>
    </div>
  )
  
  return (
    <>
      <DataTable value={orderBy(orders, ['created'], ['desc'])} 
        scrollable={!isMobile} scrollHeight={!isMobile ? "calc(100dvh - 228px)" : ""} 
        breakpoint="768px" 
        className="table-mobile-rows" stripedRows loading={isLoading}
      >
        <Column field="name" header="Наименование"
          sortable sortField="name"
          style={{ maxWidth: '7rem' }}
        ></Column>

        <Column field="agent" header="Агент"
          sortable sortField="agent"
        ></Column>
        
        <Column field="positions" header="Кол-во позиций" 
          body={(rowData)=> rowData.positions.length }
          style={{ maxWidth: '7rem' }}
        ></Column>

        <Column field="created" header="Дата создания" 
          body={(rowData)=>toDateNoTime(rowData.created)}
          style={{ maxWidth: '7rem' }}
        ></Column>

        <Column field="state.name" header="Статус"
          sortable sortField="state.name"
          style={{ maxWidth: '7rem' }}
        ></Column>

        <Column body={action} style={{ maxWidth: '3.35rem', padding: "0.25rem" }} ></Column>
      </DataTable>

      
    </>
  );
}

export default TableOrders;