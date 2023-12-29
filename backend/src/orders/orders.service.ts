import { BadRequestException, Injectable } from '@nestjs/common';
import { Id } from 'src/values/id.values';
import fetch from 'node-fetch';
import { SettingsService } from 'src/settings/settings.service';
import { UUID } from 'src/utils/uuid';

// Документация МойСклад
// https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api

// https://github.com/wmakeev/moysklad/tree/master?tab=readme-ov-file
const Moysklad = require('moysklad')

@Injectable()
export class OrdersService {
  constructor(private readonly settingsService: SettingsService) {}

  private rebaseOrder(order: any){
    return {
      id: order.id,
      name: order.name,
      agent: order.agent.name,
      sum: order.sum / 100,
      positions: order.positions.rows.map( row => ({
        id: row.id,
        name: row.assortment.name,
        assortmentId: row.assortment.id,
        quantity: row.quantity,
        price: row.price / 100,
        vat: row.vat
      }) ),
      state: order.state,
      updated: order.updated,
      created: order.created,
    }
  }

  async getOrders(token: string) {
    const ms = Moysklad({ fetch, token })

    return ms.GET('entity/customerorder', {
      filter: {},
      limit: 10,
      order: 'moment,desc',

      // Параметры которые требуется догрузить из сервиса МойСклад
      // Перечисление выполнять через ','. Если требуется получить вложение второго уровня указать как в примере 'positions.assortment' 
      expand: 'agent,positions.assortment,state'
    }).then(({ rows }) => {
      return rows.map( row => this.rebaseOrder(row))
    })
    .catch( (err: any) => {
      throw new BadRequestException(err.message, { cause: new Error(), description: err })
    })
  }

  async getOrderById(orderId: string, token: string) {
    const ms = Moysklad({ fetch, token })
    
    return ms.GET(`entity/customerorder/${orderId}`, {
      expand: 'agent,positions.assortment,state,payments'
    })
      .then((row) => row)
      .catch( (err: any) => {
        throw new BadRequestException(err.message, { cause: new Error(), description: err })
      })
  }

  async createReceipt(orderId: string, token: string, accountId: string) {

    const order = await this.getOrderById(orderId, token)

    const setting = await this.settingsService.findByAccountId(accountId)
  
    const externId = new Id(UUID.generate()).value.toString()
    const items = order.positions.rows.map( position => ({
      amount: (position.price / 100) * position.quantity,
      department: 1,
      name: position.assortment.name,
      paymentMethod: "fullPayment",
      paymentObject: "commodity",
      price: position.price / 100,
      quantity: position.quantity,
      tax: {type: `vat${position.vat}`},
      type: "position"
    }))
    const receipt = {
      cashboxId: +setting.cashboxId,
      orgId: +setting.organizationId,
      externId: externId,
      receiptBody: {
        isOnlinePayment: true,
        externId: externId,
        electronically: true,
        clientInfo: {emailOrPhone: setting.email},
        items: items,
        onlinePayment: {
          amount:{value: String(order.sum / 100), currency: "RUB"},
          description:"",
          organizationAcquiringId: +setting.paymentSystemId, 
          paymentCallback: "https://gate.stage.vdpaybox.ru",
          paymentMethodData: "bank_card"
        },
        organizationAcquiringId: +setting.paymentSystemId,
        payments: [{type: "electronically", sum: order.sum / 100}],
        type: "sell",
        operator: {name: "Кассир", vatin: null}
      }
    }

    return receipt;
  }

  setLinkOrderById(token: string, data: { link: string, orderId: string }) {
    const ms = Moysklad({ fetch, token })
    
    return ms.PUT(`entity/customerorder/${data.orderId}`, {
      description: `Ссылка на оплату ${data.link}`
    })
    .catch( (err: any) => {
      throw new BadRequestException(err.message, { cause: new Error(), description: err })
    })
  }

  async createCashIn(token: string, data: { link: string, orderId: string }) {
    const ms = Moysklad({ fetch, token })

    return await ms.PUT(`entity/cashin/new`, {
      operations: [
        {
          meta: {
            href: `https://api.moysklad.ru/api/remap/1.2/entity/customerorder/${data.orderId}`,
            metadataHref: "https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata",
            type: "customerorder",
            mediaType: "application/json"
          }
        }
      ]
    })
    .then( (r) => ms.POST(`entity/cashin/`, r) )
    .then( (r) => ms.PUT(`entity/customerorder/${data.orderId}`, {
      description: `Ссылка на чек ${data.link}`
    }) )
    .catch( (err: any) => {
      throw new BadRequestException(err.message, { cause: new Error(), description: err })
    })
  }

}
