import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get, Param,
  Patch,
  Post
} from '@nestjs/common/decorators';
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

  @Patch(':id')
  async updatePurchaseOrder(
    @Param('id') id: string,
    @Body() purchaseOrderDto: PurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    return await this.purchaseOrderService.updatePurchaseOrder(
      id,
      purchaseOrderDto,
    );
  }

  @Delete(':id')
  async removePurchaseOrder(@Param('id') id: string): Promise<void> {
    await this.purchaseOrderService.removePurchaseOrder(id);
  }
}
