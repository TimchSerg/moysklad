import { Injectable } from '@nestjs/common'
import { UUID } from 'src/utils/uuid'
import { Settings } from './settings.entity'
import { Id } from 'src/values/id.values'

@Injectable()
export class SettingsFactory {

  constructor () {}
  
  async create(
    accountId: string,
    organizationId: string,
    cashboxId: string,
    snoId: string,
    email: string,
    paymentSystemId: string,
  ): Promise<Settings> {

    return new Settings(
      new Id(UUID.generate()),
      accountId,
      organizationId,
      cashboxId,
      snoId,
      email,
      paymentSystemId,
      new Date()
    )
  }
}