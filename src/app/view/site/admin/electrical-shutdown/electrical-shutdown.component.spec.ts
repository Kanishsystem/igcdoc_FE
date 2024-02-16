import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalShutdownComponent } from './electrical-shutdown.component';

describe('ElectricalShutdownComponent', () => {
  let component: ElectricalShutdownComponent;
  let fixture: ComponentFixture<ElectricalShutdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectricalShutdownComponent]
    });
    fixture = TestBed.createComponent(ElectricalShutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
