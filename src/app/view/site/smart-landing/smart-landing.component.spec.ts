import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLandingComponent } from './smart-landing.component';

describe('SmartLandingComponent', () => {
  let component: SmartLandingComponent;
  let fixture: ComponentFixture<SmartLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartLandingComponent]
    });
    fixture = TestBed.createComponent(SmartLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
