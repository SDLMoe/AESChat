import { TestBed } from '@angular/core/testing';

import { KeySetManagerService } from './key-set-manager.service';

describe('KeySetManagerService', () => {
  let service: KeySetManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeySetManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
