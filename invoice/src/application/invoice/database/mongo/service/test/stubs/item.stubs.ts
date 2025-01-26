import { IItem } from '../../../../../model/item.model';

export class Option {}

export const ItemStubs = (option?: Option): IItem => {
  const item: IItem = {
    sku: 'test',
    qt: 2,
  };

  return item;
};
