import { TestBed } from '@angular/core/testing';

import { InfoListsService } from './info-lists.service';

describe('InfoListsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoListsService = TestBed.get(InfoListsService);
    expect(service).toBeTruthy();
  });
});
