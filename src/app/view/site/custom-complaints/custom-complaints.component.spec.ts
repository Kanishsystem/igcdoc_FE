import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomComplaintsComponent } from './custom-complaints.component';

describe('CustomComplaintsComponent', () => {
  let component: CustomComplaintsComponent;
  let fixture: ComponentFixture<CustomComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomComplaintsComponent]
    });
    fixture = TestBed.createComponent(CustomComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
