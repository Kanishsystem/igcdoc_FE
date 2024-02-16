import { TestBed } from '@angular/core/testing';

import { SmartDialogService } from './smart-dialog.service';

describe('SmartDialogService', () => {
  let service: SmartDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
