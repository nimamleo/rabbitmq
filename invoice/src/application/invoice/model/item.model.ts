import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';

export interface IItem {
  sku: string;
  qt: number;
}
export interface IItemEntity extends IItem, IEntity {}
