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
    const { name, description, quantity, price } = createPurchaseOrderDto;

    const purchaseOrder = this.purchaseOrderRepository.create();

    purchaseOrder.name = name;
    purchaseOrder.description = description;
    purchaseOrder.quantity = quantity;
    purchaseOrder.price = price;

    try {
      await purchaseOrder.save();
    } catch (error) {
      throw new Error(`Erro ao salvar pedido: ${error}`);
    }

    return purchaseOrder;
  }

  findAllPurchaseOrders(): Promise<PurchaseOrder[]> {
    return this.purchaseOrderRepository.find();
  }

  async updatePurchaseOrder(
    id: string,
    purchaseOrderDto: PurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    await this.purchaseOrderRepository.update(id, {
      name: purchaseOrderDto.name,
      description: purchaseOrderDto.description,
      quantity: purchaseOrderDto.quantity,
      price: purchaseOrderDto.price,
    });

    return this.purchaseOrderRepository.findOne({ where: { id } });
  }

  async removePurchaseOrder(id: string): Promise<void> {
    await this.purchaseOrderRepository.delete(id);
  }
}
