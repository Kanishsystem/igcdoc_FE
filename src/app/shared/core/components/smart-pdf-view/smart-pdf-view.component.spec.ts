import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPdfViewComponent } from './smart-pdf-view.component';

describe('SmartPdfViewComponent', () => {
  let component: SmartPdfViewComponent;
  let fixture: ComponentFixture<SmartPdfViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartPdfViewComponent]
    });
    fixture = TestBed.createComponent(SmartPdfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
