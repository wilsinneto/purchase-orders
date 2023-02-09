import { Controller } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { PurchaseOrderDto } from './purchase-order-dto';
import { PurchaseOrder } from './purchase-order.entity';
import { PurchaseOrderService } from './purchase-order.service';

@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(private purchaseOrderService: PurchaseOrderService) {}

  @Post()
  async createPurchaseOrder(
    @Body() createPurchaseOrder: PurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    const purchaseOrder = await this.purchaseOrderService.createPurchaseOrder(
      createPurchaseOrder,
    );

    return purchaseOrder;
  }

  @Get()
  async findAllPurchaseOrders(): Promise<PurchaseOrder[]> {
    return await this.purchaseOrderService.findAllPurchaseOrders();
  }
}
