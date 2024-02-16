import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLoginSignupComponent } from './smart-login-signup.component';

describe('SmartLoginSignupComponent', () => {
  let component: SmartLoginSignupComponent;
  let fixture: ComponentFixture<SmartLoginSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartLoginSignupComponent]
    });
    fixture = TestBed.createComponent(SmartLoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
