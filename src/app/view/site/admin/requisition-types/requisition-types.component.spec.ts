import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionTypesComponent } from './requisition-types.component';

describe('RequisitionTypesComponent', () => {
  let component: RequisitionTypesComponent;
  let fixture: ComponentFixture<RequisitionTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequisitionTypesComponent]
    });
    fixture = TestBed.createComponent(RequisitionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
