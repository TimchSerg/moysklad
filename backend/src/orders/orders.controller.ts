import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, Catch, BadRequestException } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

/*
  Fetch API библиотека для корректной работы
  Установка 
    npm install node-fetch

  В случае получения ошибки CommonJS использовать вторую версию node-fetch
    npm install node-fetch@2

  Описание библиотеки
    https://www.npmjs.com/package/node-fetch
*/
import fetch from 'node-fetch';
import { Token } from 'src/decorators/toke.decorator';

// Документация МойСклад
// https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api

// https://github.com/wmakeev/moysklad/tree/master?tab=readme-ov-file
const Moysklad = require('moysklad')

@Controller('orders')
export class OrdersController {
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

  constructor() {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    // return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Token() token) {
    const ms = Moysklad({ fetch, token })

    return ms.GET('entity/customerorder', {
      filter: {
        
      },
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

  @Get('states')
  findStates(@Token() token) {
    const ms = Moysklad({ fetch, token})

    // Получаем статусы заказа из сервиса МойСклад. Связанно с тем, что для каждого аккаунта разняться их id
    return ms.GET(`entity/customerorder/metadata`).then( r => {
      return r.states.map( state => ({
        id: state.id,
        name: state.name
      }) );
    })
    .catch( (err: any) => {
      throw new BadRequestException(err.message, { cause: new Error(), description: err })
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Token() token) {
    const ms = Moysklad({ fetch, token })
    
    return ms.GET(`entity/customerorder/${id}`, {
      expand: 'agent,positions.assortment,state'
    })
      .then((row) => this.rebaseOrder(row))
      .catch( (err: any) => {
        throw new BadRequestException(err.message, { cause: new Error(), description: err })
      })
  }

  @Put(':id')
  updateState(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Token() token) {
    const ms = Moysklad({ fetch, token })

    return ms.PUT(`entity/customerorder/${id}`, {
      state: {
        // Требуется передавать meta именно в таком формате
        meta: {
          href: `https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/${updateOrderDto.stateId}`,
          metadataHref: "https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata",
          type: "state",
          mediaType: "application/json"
        }
        
      }
    })
    .catch( (err: any) => {
      throw new BadRequestException(err.message, { cause: new Error(), description: err })
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.ordersService.remove(+id);
  }
}
