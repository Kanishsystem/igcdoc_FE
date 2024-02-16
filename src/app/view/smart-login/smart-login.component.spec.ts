import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLoginComponent } from './smart-login.component';

describe('SmartLoginComponent', () => {
  let component: SmartLoginComponent;
  let fixture: ComponentFixture<SmartLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartLoginComponent]
    });
    fixture = TestBed.createComponent(SmartLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
