import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseDocumentsComponent } from './license-documents.component';

describe('LicenseDocumentsComponent', () => {
  let component: LicenseDocumentsComponent;
  let fixture: ComponentFixture<LicenseDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenseDocumentsComponent]
    });
    fixture = TestBed.createComponent(LicenseDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
