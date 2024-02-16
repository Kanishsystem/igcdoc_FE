import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRequisitionComponent } from './custom-requisition.component';

describe('CustomRequisitionComponent', () => {
  let component: CustomRequisitionComponent;
  let fixture: ComponentFixture<CustomRequisitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomRequisitionComponent]
    });
    fixture = TestBed.createComponent(CustomRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
