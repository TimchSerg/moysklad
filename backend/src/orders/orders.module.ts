import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { PbOrdersController } from './pb.orders.controller';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { OrdersService } from './orders.service';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  controllers: [OrdersController, PbOrdersController],
  imports: [ AuthorizationModule, SettingsModule ],
  providers: [
    OrdersService
  ]
})
export class OrdersModule {}
