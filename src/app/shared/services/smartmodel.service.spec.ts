import { TestBed } from '@angular/core/testing';

import { SmartmodelService } from './smartmodel.service';

describe('SmartmodelService', () => {
  let service: SmartmodelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartmodelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
