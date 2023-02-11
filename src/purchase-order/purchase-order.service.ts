import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PurchaseOrderDto } from './purchase-order-dto';
import { PurchaseOrder } from './purchase-order.entity';
import { PurchaseOrderRepository } from './purchase-order.repository';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private purchaseOrderRepository: PurchaseOrderRepository,
    @Inject('PURCHASE-ORDER_SERVICE') private readonly client: ClientProxy,
  ) {}
  async createPurchaseOrder(
    createPurchaseOrder: PurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    const purchaseOrder =
      await this.purchaseOrderRepository.createPurchaseOrder(
        createPurchaseOrder,
      );

    this.client.emit('purchase-order_created', JSON.stringify(purchaseOrder));

    return purchaseOrder;
  }

  async findAllPurchaseOrders(): Promise<PurchaseOrder[]> {
    const purchaseOrderList =
      await this.purchaseOrderRepository.findAllPurchaseOrders();

    return purchaseOrderList;
  }

  async updatePurchaseOrder(
    id: string,
    purchaseOrderDto: PurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    return await this.purchaseOrderRepository.updatePurchaseOrder(
      id,
      purchaseOrderDto,
    );
  }

  async removePurchaseOrder(id: string): Promise<void> {
    await this.purchaseOrderRepository.removePurchaseOrder(id);
  }
}
