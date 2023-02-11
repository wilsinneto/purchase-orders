import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrder } from './purchase-order.entity';
import { PurchaseOrderRepository } from './purchase-order.repository';
import { PurchaseOrderService } from './purchase-order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder]),
    ClientsModule.register([
      {
        name: 'HELLO_SERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
  providers: [PurchaseOrderService, PurchaseOrderRepository],
  controllers: [PurchaseOrderController],
  exports: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
