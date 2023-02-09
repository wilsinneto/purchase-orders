import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderDto } from './purchase-order-dto';
import { PurchaseOrder } from './purchase-order.entity';

@Injectable()
export class PurchaseOrderRepository {
  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,
  ) {}

  async createPurchaseOrder(
    createPurchaseOrderDto: PurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    const { name, description } = createPurchaseOrderDto;

    const purchaseOrder = this.purchaseOrderRepository.create();

    purchaseOrder.name = name;
    purchaseOrder.description = description;

    try {
      await purchaseOrder.save();
    } catch (error) {
      throw new Error(`Erro ao salvar pedido: ${error}`);
    }

    return purchaseOrder;
  }
}
