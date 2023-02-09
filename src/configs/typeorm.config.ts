import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PurchaseOrder } from 'src/purchase-order/purchase-order.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'pguser',
  entities: [PurchaseOrder],
  synchronize: true,
};
