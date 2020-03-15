import controllers from '../list.controllers';
import { isFunction } from 'lodash';

describe('list controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = ['fetchById', 'fetchAll', 'create', 'remove', 'update'];

    crudMethods.forEach(name =>
      expect(isFunction(controllers[name])).toBe(true)
    );
  });
});
