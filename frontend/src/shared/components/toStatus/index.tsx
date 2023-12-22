import { IRestaurant } from "app/interfaces/restaurants";
import { Chip } from "primereact/chip";

export function toStatusRestaurant(status: string): string {
  switch (status) {
    case 'active':
      return 'Активно';
    case 'notActive':
      return 'Не активно';
    default:
      return status
  }
}

export function toStatus(status: string): string {
  switch (status) {
    case 'create':
      return 'Свободно';
    case 'raffle':
      return 'Разыгрывается';
    case 'active':
      return 'Активна';
    case 'verification':
      return 'На модерации';
    case 'not_verified':
      return 'Проверка не пройдена';
    case 'verified':
      return 'Проверен, ожидание получения счета';
    case 'payment':
      return 'Подтвердить оплату';
    case 'complete':
      return 'Выполнена';
    case 'expired':
      return 'Просрочено';
    default:
      return status
  }
}

export function toStatusTask(value: string){
  
  switch (value) {
    case 'new':
      return 'Свободно';
    case 'start':
        return 'Идёт набор';
    case 'active':
      return 'В процессе выполнения';
    case 'verification':
      return 'На проверке'
    case 'verified':
      return 'Проверено'
    case 'not_verified':
      return 'Не прошло проверку'
    case 'reject':
      return 'Отменена'
    case 'confirm':
      return 'Завершена';
    case 'payout':
      return 'Ожидает выплаты';
    default:
      return 'не указано';
  }
}

export function toStatusRaffle(value: string){
  switch (value) {
    case 'active':
      return 'Исполнитель';
    case 'new':
      return 'Участие';
    case 'winner':
        return 'Победитель';
    case 'confirm':
      return 'Выполнил';
    case 'lose':
      return 'Проигравший';
    case 'frozen':
      return 'Заморожен'
    default:
      return 'не указано';
  }
}

export function toStatusOrder(value: string){
  switch (value) {
    case 'new':
      return 'Ожидает оплаты';
    case 'reject':
      return 'Отменена'
    case 'confirm':
      return 'Оплачено';
    default:
      return 'не указано';
  }
}

export function toTypeOrder(value: string){
  switch (value) {
    case 'pay_acc':
      return 'Расчетный счет';
    case 'qr':
      return 'СБП'
    case 'sbp':
      return 'СБП';
    default:
      return 'не указано';
  }
}

export function toTypeQuestion(type: string){
  switch (type) {
    case 'isOne':
      return 'Один из';
    case 'text':
      return 'Текст';
    case 'area':
      return 'Большой текст';
    default:
      return type
  }
}

export function toCategoryQuestion(category: string){
  switch (category) {
    case 'main':
      return 'Основная информация';
    case 'entry':
      return 'Вход';
    case 'farewell':
      return 'Расчёт/прощание';
    case 'impression':
      return 'Впечатления о посещении';
    case 'order':
      return 'Заказ';
    case 'service':
      return 'Обслуживание';
    case 'standard':
      return 'Соответствие стандартам';
    default:
      return category
  }
}

export const toTypeQuestionTemplate = (type: string) => <span className={`question-type question-type-${type}`}>{toTypeQuestion(type)}</span>
export const toCategoryQuestionTemplate = (category: string) => <span className={`question-type question-category-${category}`}>{toCategoryQuestion(category)}</span>
export const toCategorySchemaTemplate = (category: string) => {
  let eng = 'default';
  if(category === "Рестораны") eng = 'restaurants';
  if(category === "Кофейни") eng = 'coffee';
  if(category === "Кальянные") eng = 'hookah';

  return <span className={`question-type schema-category-${eng}`}>{category}</span>
}

export const toFioTemplate = (user: any) => (
  <div className="p-d-flex p-ai-center">
    <img 
      alt={user.fio} 
      src={`${user?.avatar ? '/api/files/' + user.avatar : '/api/admin/files/default'}`} 
      width={32}
      height={32}
      style={{ verticalAlign: 'middle', borderRadius: '50%' }} 
      className="p-mr-2"
    />
    
    <span > <strong>{user.fio !== " " ? user.fio : 'Не указано'}</strong> (<i>tel:{user.phone}</i>)</span>
  </div>
);

export function toRoleUser(value: string){
  switch (value) {
    case 'manager':
      return 'Менеджер';
    case 'owner':
      return 'Владелец'
    case 'client':
      return 'Клиент';
    default:
      return 'не указано';
  }
}

export const toRoleTemplate = (status: string) => <span className={`task-status task-status-${status}`}>{toRoleUser(status)}</span>



const location = window.location;
const hostname = location.hostname;
const protocol = location.protocol;

export const toRestaurantsChips = (restaurants: IRestaurant[]) => {
  const host = hostname === 'localhost' ? 'localhost:3000' : hostname === 'admin.3raza.com' ? "3raza.com" : "demo.3raza.com";
  const url = protocol + "//" + host + "#/main/restaurant/";
  const chips = restaurants.map( rest => (
    <div key={rest.id}>
      <a href={url + rest.id} target="_blank" rel="noopener noreferrer">
        <Chip label={rest.name} image={rest?.logo ? '/api/files/' + rest?.logo : '/api/admin/files/default'} className="mr-2 mb-2" />
      </a>
    </div>
  ) )

  return chips;
}