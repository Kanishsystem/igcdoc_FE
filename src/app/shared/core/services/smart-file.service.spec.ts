import { TestBed } from '@angular/core/testing';

import { SmartFileService } from './smart-file.service';

describe('SmartFileService', () => {
  let service: SmartFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
