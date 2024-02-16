import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTablenewComponent } from './smart-tablenew.component';

describe('SmartTablenewComponent', () => {
  let component: SmartTablenewComponent;
  let fixture: ComponentFixture<SmartTablenewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartTablenewComponent]
    });
    fixture = TestBed.createComponent(SmartTablenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
