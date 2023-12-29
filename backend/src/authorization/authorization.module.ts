import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorizationController } from './authorization.controller';
import { TokensModel } from 'src/database/models/token.model';
import { AuthorizationService } from './authorization.service';
import { TokenFactory } from './token.factory';
import { TokenRepository } from './token.repository';

@Module({
  imports: [SequelizeModule.forFeature([TokensModel])],
  controllers: [AuthorizationController],
  providers: [
    { provide: 'TokenFactory', useClass: TokenFactory },
    { provide: 'TokenRepository', useClass: TokenRepository },

    AuthorizationService
  ],
  exports: [ AuthorizationService ]
})
export class AuthorizationModule {}
