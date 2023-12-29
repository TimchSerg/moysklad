import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SettingsModel } from 'src/database/models/settings.model';
import { SettingsFactory } from './settings.factory';
import { SettingsRepository } from './settings.repository';

@Module({
  imports: [SequelizeModule.forFeature([SettingsModel])],
  controllers: [SettingsController],
  providers: [
    { provide: 'SettingsFactory', useClass: SettingsFactory },
    { provide: 'SettingsRepository', useClass: SettingsRepository },

    SettingsService
  ],
  exports: [SettingsService]
})
export class SettingsModule {}
