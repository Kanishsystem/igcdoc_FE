import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartServerTableComponent } from './smart-server-table.component';

describe('SmartServerTableComponent', () => {
  let component: SmartServerTableComponent;
  let fixture: ComponentFixture<SmartServerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartServerTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartServerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
