import { Injectable } from '@nestjs/common';
import { PurchaseOrderDto } from './purchase-order-dto';
import { PurchaseOrder } from './purchase-order.entity';
import { PurchaseOrderRepository } from './purchase-order.repository';

@Injectable()
export class PurchaseOrderService {
  constructor(private purchaseOrderRepository: PurchaseOrderRepository) {}

  async createPurchaseOrder(
    createPurchaseOrder: PurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    return this.purchaseOrderRepository.createPurchaseOrder(
      createPurchaseOrder,
    );
  }

  async findAllPurchaseOrders(): Promise<PurchaseOrder[]> {
    return await this.purchaseOrderRepository.findAllPurchaseOrders();
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
