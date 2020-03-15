import { List } from '../list.model';

describe('List model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = List.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true
      });
    });
  });
});
