import { Item } from './item.model';

export interface List {
  _id?: string;
  name: string;
  items?: Item[];
  createdAt?: string;
  updatedAt?: string;
}
