import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesOfMeetingComponent } from './minutes-of-meeting.component';

describe('MinutesOfMeetingComponent', () => {
  let component: MinutesOfMeetingComponent;
  let fixture: ComponentFixture<MinutesOfMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinutesOfMeetingComponent]
    });
    fixture = TestBed.createComponent(MinutesOfMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
