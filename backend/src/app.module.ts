import { Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization/authorization.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthorizationModule, OrdersModule],
})
export class AppModule {}
