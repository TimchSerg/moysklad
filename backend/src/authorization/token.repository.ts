import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UUID } from 'src/utils/uuid'
import { TokensModel } from 'src/database/models/token.model'
import { Token } from './token.entity'
import { Id } from 'src/values/id.values'

function reconstitute(data: TokensModel): Token {
  return new Token(
    new Id(UUID.from(data.id)),
    data.accountId,
    data.token,
    data.createdAt
  )
}

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(TokensModel)
    private tokensModel: typeof TokensModel
  ) {}

  async getById(id: Id): Promise<Token | null> {
    const model = await this.tokensModel.findOne({ 
      where: { id: id.value.toString() } 
    })
    return model == null ? null : reconstitute(model)
  }

  async getByAccountId(accountId: string): Promise<Token | null> {
    const model = await this.tokensModel.findOne({ 
      where: { accountId: accountId } 
    })
    
    return model == null ? null : reconstitute(model)
  }

  async save(token: Token): Promise<void> {
    const [ model ] = await this.tokensModel.findOrBuild({
      where: { id: token.id.value.toString() } 
    })

    model.set({
      id: token.id.value.toString(),
      accountId: String(token.accountId),
      token: String(token.token),
      createdAt: token.createdAt
    })

    await model.save()
  }

  async delete(token: Token): Promise<void> {
    await this.tokensModel.destroy({ 
      where: { id: token.id.value.toString() }
    })
  }
}