import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartNewDashCardComponent } from './smart-new-dash-card.component';

describe('SmartNewDashCardComponent', () => {
  let component: SmartNewDashCardComponent;
  let fixture: ComponentFixture<SmartNewDashCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartNewDashCardComponent]
    });
    fixture = TestBed.createComponent(SmartNewDashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
