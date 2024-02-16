import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetProposalsComponent } from './meet-proposals.component';

describe('MeetProposalsComponent', () => {
  let component: MeetProposalsComponent;
  let fixture: ComponentFixture<MeetProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetProposalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
