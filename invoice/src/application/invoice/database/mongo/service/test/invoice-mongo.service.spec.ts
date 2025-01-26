import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { InvoiceMongoService } from '../invoice-mongo.service';
import { Invoice, InvoiceSchema } from '../../schema/invoice.schema';
import { InvoiceStubs } from './stubs/invoice.stubs';
import { INestApplication } from '@nestjs/common';
import { INVOICE_DATABASE_PROVIDER } from '../../../provider/invoice-database.provider';
import { GetInvoiceListQueryable } from '../../../queryable/get-invoice-list.queryable';

describe('InvoiceMongoService Integration', () => {
  let service: InvoiceMongoService;
  const dbUri = 'mongodb://localhost:27018';
  const dbName = 'test';

  let app: INestApplication;

  beforeAll(async () => {
    try {
      await mongoose.connect(dbUri, {
        dbName,
        autoCreate: true,
      });
    } catch (e) {
      console.log(e);
    }
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test_db'),
        MongooseModule.forFeature([
          { name: Invoice.name, schema: InvoiceSchema },
        ]),
      ],
      providers: [
        {
          provide: INVOICE_DATABASE_PROVIDER,
          useClass: InvoiceMongoService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    service = app.get<InvoiceMongoService>(INVOICE_DATABASE_PROVIDER);
  });

  afterAll(async () => {
    // await mongoose.connection.close();
  });

  // afterEach(async () => {
  //   mongoose.connection.deleteModel(Invoice.name);
  // });

  describe('createInvoice', () => {
    it('should create an invoice successfully', async () => {
      const mockData = Invoice.fromIInvoice(InvoiceStubs({}));
      const result = await service.createInvoice(mockData);

      expect(result.isOK()).toBe(true);
      expect(result.value.id).not.toBeNull();
      expect(result.value.date).not.toBeNull();
    });
  });

  describe('getInvoiceById', () => {
    it('should retrieve an existing invoice', async () => {
      const mockData = Invoice.fromIInvoice(InvoiceStubs({}));
      const createResult = await service.createInvoice(mockData);
      const createdInvoice = createResult.value;

      const result = await service.getInvoiceById(createdInvoice.id);

      expect(result.isOK()).toBe(true);
      expect(result.value.id).toBe(createdInvoice.id);
    });

    it('should return error for non-existent invoice', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const result = await service.getInvoiceById(nonExistentId);

      expect(result.isOK()).toBe(false);
    });
  });

  describe('getInvoiceList', () => {
    it('should retrieve invoices with pagination', async () => {
      // Create multiple invoices
      const mockInvoices = [
        Invoice.fromIInvoice(InvoiceStubs({})),
        Invoice.fromIInvoice(InvoiceStubs({})),
      ];
      await Promise.all(
        mockInvoices.map((invoice) => service.createInvoice(invoice)),
      );

      const queryable: GetInvoiceListQueryable = {
        date: new Date(),
        limitation: { limit: 1, skip: 0 },
      };

      const result = await service.getInvoiceList(queryable);

      expect(result.isOK()).toBe(true);
      expect(result.value[0]).toHaveLength(1);
      expect(result.value[1]).toBeGreaterThan(0);
    });
  });

  describe('getDailySales', () => {
    it('should retrieve daily sales summary', async () => {
      const mockData = Invoice.fromIInvoice(InvoiceStubs({}));
      await service.createInvoice(mockData);

      const result = await service.getDailySales();

      expect(result.isOK()).toBe(true);
      expect(result.value).toBeInstanceOf(Array);
    });
  });
});
