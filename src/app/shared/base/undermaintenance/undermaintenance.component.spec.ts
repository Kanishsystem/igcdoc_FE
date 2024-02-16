import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndermaintenanceComponent } from './undermaintenance.component';

describe('UndermaintenanceComponent', () => {
  let component: UndermaintenanceComponent;
  let fixture: ComponentFixture<UndermaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndermaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndermaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
