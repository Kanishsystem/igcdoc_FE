import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartModelComponent } from './smart-model.component';

describe('SmartModelComponent', () => {
  let component: SmartModelComponent;
  let fixture: ComponentFixture<SmartModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
