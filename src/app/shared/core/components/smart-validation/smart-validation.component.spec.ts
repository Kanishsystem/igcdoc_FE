import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartValidationComponent } from './smart-validation.component';

describe('SmartValidationComponent', () => {
  let component: SmartValidationComponent;
  let fixture: ComponentFixture<SmartValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
