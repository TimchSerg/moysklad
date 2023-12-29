import { Controller, Post, Body, BadRequestException, Get, Param } from '@nestjs/common';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
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
import { AuthorizationService } from './authorization.service';

// Документация МойСклад
// https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api

// https://github.com/wmakeev/moysklad/tree/master?tab=readme-ov-file
const Moysklad = require('moysklad')


@Controller('/api/authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post()
  create(@Body() data: { token: string, accountId: string }) {
    const ms = Moysklad({ fetch, token: data.token })
    return ms.GET('entity/employee', {
      limit: 1,
    }).then( async () => {
      const account = await this.authorizationService.findOne(String(data.accountId));
      if(account) return await this.authorizationService.update(data.accountId, data.token)
      return await this.authorizationService.create(data.token, data.accountId)
    }).catch( (err: any) => {
      throw new BadRequestException(err.message, { cause: new Error(), description: err })
    })
  }

  @Post('token')
  createToken(@Body() createAuthorizationDto: CreateAuthorizationDto) {
    const ms = Moysklad({ fetch, ...createAuthorizationDto})
    return ms.POST('security/token', {})
      .catch( (err: any) => {
        throw new BadRequestException(err.message, { cause: new Error(), description: err })
      })
  }

  @Get('check/:accountId')
  checkToken(@Param('accountId') accountId: string) {
    return this.authorizationService.findOne(accountId)
      .then( r => {
        if(!r) throw new BadRequestException('Запись не найдена', { cause: new Error(), description: 'Запись не найдена' })
        const ms = Moysklad({ fetch, token: r.token })
        return ms.GET('entity/employee', {
          limit: 1,
        })
      })
      .then( () => ({access: true}) )
      .catch( (err: any) => {
        throw new BadRequestException(err.message, { cause: new Error(), description: err })
      })
  }

  @Get('users')
  findUsers(@Token() token) {
    const ms = Moysklad({ fetch, token })
    return ms.GET('entity/employee', {
      limit: 1,
    })
      .then( ({ rows }) => rows.map( (row) => ({
        id: row.id,
        name: row.name,
        lastName: row.lastName,
        fullName: row.fullName,
        created: row.created,
        email: row.email,
        phone: row.phone,
      })))
      .catch( (err: any) => {
        throw new BadRequestException(err.message, { cause: new Error(), description: err })
      })
  }

}
