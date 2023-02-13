import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { PurchaseOrderRepository } from './purchase-order.repository';

const onePurchaseOrder = {
  id: 'c91a1f4d-d6f2-461d-8e64-72d4f207d8f4',
  name: 'Cerveja Pilsen',
  description: null,
  quantity: 2,
  price: 12.5,
  createdAt: new Date('2023-02-09T17:00:34.370Z'),
  updatedAt: new Date('2023-02-09T17:00:34.370Z'),
};

describe('PurchaseOrderRepository', () => {
  let repository: PurchaseOrderRepository;

  const mockedRepo = {
    find: jest.fn(() => Promise.resolve([onePurchaseOrder])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderRepository,
        {
          provide: getRepositoryToken(PurchaseOrder),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    repository = await module.get(PurchaseOrderRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('PurchaseOrderRepository', () => {
    it('should return a Purchase Order list', async () => {
      const find = jest.spyOn(mockedRepo, 'find');

      const purchaseOrders = await repository.findAllPurchaseOrders();

      expect(purchaseOrders).toEqual([onePurchaseOrder]);
      expect(find).toHaveBeenCalledTimes(1);
    });
  });
});
