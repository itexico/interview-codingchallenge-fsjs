import { Item } from '../item.model';
import mongoose from 'mongoose';

describe('Item model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = Item.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true
      });
    });

    test('list', () => {
      const createdBy = Item.schema.obj.list;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'list',
        required: true
      });
    });
  });
});
