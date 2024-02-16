import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalComplaintsAdminComponent } from './electrical-complaints-admin.component';

describe('ElectricalComplaintsAdminComponent', () => {
  let component: ElectricalComplaintsAdminComponent;
  let fixture: ComponentFixture<ElectricalComplaintsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectricalComplaintsAdminComponent]
    });
    fixture = TestBed.createComponent(ElectricalComplaintsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
