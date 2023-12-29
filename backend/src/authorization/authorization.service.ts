import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TokensModel } from 'src/database/models/token.model';
import { TokenRepository } from './token.repository';
import { TokenFactory } from './token.factory';
import { TokenDto } from './dto/token.dto';
import { Id } from 'src/values/id.values';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject('TokenFactory')
    private tokenFactory: TokenFactory,
    @Inject('TokenRepository')
    private tokenRepository: TokenRepository,
    @InjectModel(TokensModel)
    private tokensModel: typeof TokensModel,
  ) {}
  
  async create( token: string, accountId: string ) {
    const data = await this.tokenFactory.create(
      accountId,
      token
    )

    await this.tokenRepository.save(data)
  }

  async findOne(accountId: string): Promise<TokenDto | null> {
    return await this.tokensModel.findOne({
      where: { accountId: accountId }
    }) as TokenDto
  }

  async update(accountId: string, token: string): Promise<void> {
    const required = await this.tokenRepository.getByAccountId(String(accountId))
    
    if (required == null) {
      throw new BadRequestException(`Запись не была найдена по идентификатору ${accountId}`, { cause: new Error(), description: `Запись не была найдена по идентификатору ${accountId}` })
    }

    required.token = String(token)
    
    await this.tokenRepository.save(required)  
  }

  async remove(id: string): Promise<void> {
    const tokenId = Id.from(id)
    
    const token = await this.tokenRepository.getById(tokenId)

    if (token == null) {
      throw new BadRequestException(`Запись не была найдена по идентификатору ${id}`, { cause: new Error(), description: `Запись не была найдена по идентификатору ${id}` })
    }

    await this.tokenRepository.delete(token)
  }
}
