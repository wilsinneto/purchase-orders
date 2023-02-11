import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post
} from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { PurchaseOrderDto } from './purchase-order-dto';
import { PurchaseOrder } from './purchase-order.entity';
import { PurchaseOrderService } from './purchase-order.service';

@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(
    private purchaseOrderService: PurchaseOrderService,
    @Inject('HELLO_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

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
    this.client
      .emit('message_printed', { name: 'Hello World' })
      .pipe(timeout(5000));
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
