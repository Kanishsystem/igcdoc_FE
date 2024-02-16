import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialstartComponent } from './initialstart.component';

describe('InitialstartComponent', () => {
  let component: InitialstartComponent;
  let fixture: ComponentFixture<InitialstartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialstartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
