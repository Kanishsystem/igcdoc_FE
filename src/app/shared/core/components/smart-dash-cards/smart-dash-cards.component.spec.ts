import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartDashCardsComponent } from './smart-dash-cards.component';

describe('SmartDashCardsComponent', () => {
  let component: SmartDashCardsComponent;
  let fixture: ComponentFixture<SmartDashCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartDashCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartDashCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
