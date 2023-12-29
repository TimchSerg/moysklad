import { Injectable } from '@nestjs/common'
import { UUID } from 'src/utils/uuid'
import { Token } from './token.entity'
import { Id } from 'src/values/id.values'

@Injectable()
export class TokenFactory {

  constructor () {}
  
  async create(
    accountId: string,
    token: string,
  ): Promise<Token> {

    return new Token(
      new Id(UUID.generate()),
      accountId,
      token,
      new Date()
    )
  }
}