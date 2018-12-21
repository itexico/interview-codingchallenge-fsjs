import {ListModel} from './list.model';

export class ItemModel {
  _id: string;
  description: string;
  list: ListModel;
}
