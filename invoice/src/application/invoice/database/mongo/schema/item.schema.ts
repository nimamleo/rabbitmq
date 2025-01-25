import { Prop, Schema } from '@nestjs/mongoose';
import { IItemEntity } from '../../../model/item.model';
import { Types } from 'mongoose';

export class Item {
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  sku: string;

  @Prop({ required: true, type: Number })
  qt: number;

  static fromIItem(iItem: Partial<IItemEntity>): Item {
    if (!iItem) {
      return null;
    }

    const item = new Item();

    item._id = new Types.ObjectId(iItem.id);
    item.qt = iItem.qt;
    item.sku = iItem.sku;

    return item;
  }

  static toIItemEntity(item: Item): IItemEntity {
    if (!item) {
      return null;
    }

    return {
      id: item._id.toString(),
      sku: item.sku,
      qt: item.qt,
    };
  }
}
