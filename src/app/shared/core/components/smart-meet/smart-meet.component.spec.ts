import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartMeetComponent } from './smart-meet.component';

describe('SmartMeetComponent', () => {
  let component: SmartMeetComponent;
  let fixture: ComponentFixture<SmartMeetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartMeetComponent]
    });
    fixture = TestBed.createComponent(SmartMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
