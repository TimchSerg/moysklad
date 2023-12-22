import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { useMediaQuery } from "react-responsive";
import { useGetOrderByIdMutation } from "app/services/orders";
import { toDate, toDateNoTime } from "shared/utils/toDate.util";
import { ScrollPanel } from "primereact/scrollpanel";
import { WrapperSpinner } from "shared/components/static";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";

interface IProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  currentId: string | null;
}

export const OrderWin: React.FC<IProps> = (props: any) => {
  const { visible, setVisible, currentId } = props;
  const [ getOrderById, {data, isLoading} ] = useGetOrderByIdMutation()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  useEffect(() => { if(currentId) getOrderById({id: currentId}) }, [currentId, getOrderById])

  if(!currentId || !data) return <></>

  return (
    <Dialog 
      header={`Заказ покупателя от ${data ? toDateNoTime(data?.created) : '-'}`} 
      visible={visible} 
      className="col-12 p-0 md:col-10 lg:col-5"
      style={ isMobile ? {
        width: "100vw",
        height: "100dvh",
        maxHeight: "100%",
        zIndex: '9999'
      } : {} }
      onHide={() => { 
        setVisible(false) 
      }}
    >
      <ScrollPanel style={isMobile ? { width: '100%', height: 'calc(100dvh - 144px)' } : {height: 'calc(100dvh - 500px)'}}>
        <WrapperSpinner progress={isLoading} >
          <>

            <div className="col-12 p-0 mt-2 flex justify-content-between">
              <span>Наименование:</span>
              <span>{data.name}</span>
            </div>
            <div className="col-12 p-0 mt-2 flex justify-content-between">
              <span>Дата создания:</span>
              <span>{`${toDate(data.created)}`}</span>
            </div>
            <div className="col-12 p-0 mt-2 flex justify-content-between">
              <span>Сумма:</span>
              <span>{data.sum}₽</span>
            </div>
            <div className="col-12 p-0 mt-2 flex justify-content-between">
              <span>Статус:</span>
              <span>{data.state.name}</span>
            </div>
            
            <Divider align="center"> Позиции </Divider>

            <DataTable value={data.positions} 
              scrollable={!isMobile} scrollHeight={!isMobile ? "calc(100dvh - 228px)" : ""} 
              breakpoint="768px" 
              className="table-mobile-rows mt-3" stripedRows loading={isLoading}
            >
              <Column field="name" header="Наименование"
                sortable sortField="name"
              ></Column>
              
              <Column field="quantity" header="Кол-во"
                style={{ maxWidth: '7rem' }}
              ></Column>

              <Column field="price" header="Цена"
                style={{ maxWidth: '7rem' }}
              ></Column>

            </DataTable>
          </>
        </WrapperSpinner>
      </ScrollPanel>
    </Dialog>
  );
}

export default OrderWin;
