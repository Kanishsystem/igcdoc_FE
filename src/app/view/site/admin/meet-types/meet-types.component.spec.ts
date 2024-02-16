import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetTypesComponent } from './meet-types.component';

describe('MeetTypesComponent', () => {
  let component: MeetTypesComponent;
  let fixture: ComponentFixture<MeetTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetTypesComponent]
    });
    fixture = TestBed.createComponent(MeetTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
