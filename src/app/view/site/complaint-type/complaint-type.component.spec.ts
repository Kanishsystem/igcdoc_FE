import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintTypeComponent } from './complaint-type.component';

describe('ComplaintTypeComponent', () => {
  let component: ComplaintTypeComponent;
  let fixture: ComponentFixture<ComplaintTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintTypeComponent]
    });
    fixture = TestBed.createComponent(ComplaintTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
