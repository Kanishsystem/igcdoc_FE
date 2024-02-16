import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneComplaintAdminComponent } from './telephone-complaint-admin.component';

describe('TelephoneComplaintAdminComponent', () => {
  let component: TelephoneComplaintAdminComponent;
  let fixture: ComponentFixture<TelephoneComplaintAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelephoneComplaintAdminComponent]
    });
    fixture = TestBed.createComponent(TelephoneComplaintAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
