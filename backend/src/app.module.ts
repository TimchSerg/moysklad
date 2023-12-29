import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { AuthorizationModule } from './authorization/authorization.module';
import { OrdersModule } from './orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokensModel } from './database/models/token.model';
import { SettingsModule } from './settings/settings.module';
import { SettingsModel } from './database/models/settings.model';

config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : 'localhost',
      port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
      username: process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : 'root',
      password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : 'root',
      database: process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'test',
      models: [
        TokensModel,
        SettingsModel
      ],
    }),
    AuthorizationModule, 
    OrdersModule, 
    SettingsModule
  ],
})
export class AppModule {}
