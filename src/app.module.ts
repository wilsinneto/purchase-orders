import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    PurchaseOrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
