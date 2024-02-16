import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDocumentComponent } from './all-document.component';

describe('AllDocumentComponent', () => {
  let component: AllDocumentComponent;
  let fixture: ComponentFixture<AllDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDocumentComponent]
    });
    fixture = TestBed.createComponent(AllDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
