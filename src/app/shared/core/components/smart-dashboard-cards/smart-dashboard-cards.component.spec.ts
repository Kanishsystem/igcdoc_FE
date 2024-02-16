import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartDashboardCardsComponent } from './smart-dashboard-cards.component';

describe('SmartDashboardCardsComponent', () => {
  let component: SmartDashboardCardsComponent;
  let fixture: ComponentFixture<SmartDashboardCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartDashboardCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartDashboardCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
