import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicalComplaintsComponent } from './mechanical-complaints.component';

describe('MechanicalComplaintsComponent', () => {
  let component: MechanicalComplaintsComponent;
  let fixture: ComponentFixture<MechanicalComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MechanicalComplaintsComponent]
    });
    fixture = TestBed.createComponent(MechanicalComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
