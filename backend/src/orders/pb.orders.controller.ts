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
import { AuthorizationService } from 'src/authorization/authorization.service';
import { OrdersService } from './orders.service';

// Документация МойСклад
// https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api

// https://github.com/wmakeev/moysklad/tree/master?tab=readme-ov-file
const Moysklad = require('moysklad')

@Controller('/api/pb/orders')
export class PbOrdersController {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly ordersService: OrdersService
  ) {}

  @Post('/link/:accountId')
  async sendLink(
    @Param('accountId') accountId: string,
    @Body() data: { link: string, orderId: string }
  ) {
    const token = await this.authorizationService.findOne(accountId);
    if(!token) throw new BadRequestException('Токен не найден', { cause: new Error(), description: 'Токен не найден' })

    return await this.ordersService.setLinkOrderById(token.token, data )
  }

  @Post('/cashout/:accountId')
  async cashOutOrder(
    @Param('accountId') accountId: string,
    @Body() data: { link: string, orderId: string }
  ) {
    const token = await this.authorizationService.findOne(accountId);
    if(!token) throw new BadRequestException('Токен не найден', { cause: new Error(), description: 'Токен не найден' })

    return await this.ordersService.createCashIn(token.token, data )
  }

  @Post(':accountId')
  async createReceipt(
    @Param('accountId') accountId: string,
    @Body() data: { orderId: string }
  ) {
    const token = await this.authorizationService.findOne(accountId);
    if(!token) throw new BadRequestException('Токен не найден', { cause: new Error(), description: 'Токен не найден' })

    return await this.ordersService.createReceipt(data.orderId, token.token, accountId)
  }

  @Get(':accountId')
  async findAll(@Param('accountId') accountId: string ) {
    const token = await this.authorizationService.findOne(accountId);
    if(!token) throw new BadRequestException('Токен не найден', { cause: new Error(), description: 'Токен не найден' })

    return await this.ordersService.getOrders(token.token)
  }

  // @Get('states')
  // findStates(@Token() token) {
  //   const ms = Moysklad({ fetch, token})

  //   // Получаем статусы заказа из сервиса МойСклад. Связанно с тем, что для каждого аккаунта разняться их id
  //   return ms.GET(`entity/customerorder/metadata`).then( r => {
  //     return r.states.map( state => ({
  //       id: state.id,
  //       name: state.name
  //     }) );
  //   })
  //   .catch( (err: any) => {
  //     throw new BadRequestException(err.message, { cause: new Error(), description: err })
  //   })
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string, @Token() token) {
  //   const ms = Moysklad({ fetch, token })
    
  //   return ms.GET(`entity/customerorder/${id}`, {
  //     expand: 'agent,positions.assortment,state'
  //   })
  //     .then((row) => this.rebaseOrder(row))
  //     .catch( (err: any) => {
  //       throw new BadRequestException(err.message, { cause: new Error(), description: err })
  //     })
  // }

  // @Put(':id')
  // updateState(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Token() token) {
  //   const ms = Moysklad({ fetch, token })

  //   return ms.PUT(`entity/customerorder/${id}`, {
  //     state: {
  //       // Требуется передавать meta именно в таком формате
  //       meta: {
  //         href: `https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/${updateOrderDto.stateId}`,
  //         metadataHref: "https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata",
  //         type: "state",
  //         mediaType: "application/json"
  //       }
        
  //     }
  //   })
  //   .catch( (err: any) => {
  //     throw new BadRequestException(err.message, { cause: new Error(), description: err })
  //   })
  // }

}
