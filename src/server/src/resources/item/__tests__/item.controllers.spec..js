import controllers from '../item.controllers';
import { isFunction } from 'lodash';

describe('item controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = ['fetchById', 'fetchAll', 'create', 'remove', 'update'];

    crudMethods.forEach(name =>
      expect(isFunction(controllers[name])).toBe(true)
    );
  });
});
