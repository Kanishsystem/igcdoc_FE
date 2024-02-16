import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagentComponent } from './role-managent.component';

describe('RoleManagentComponent', () => {
  let component: RoleManagentComponent;
  let fixture: ComponentFixture<RoleManagentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleManagentComponent]
    });
    fixture = TestBed.createComponent(RoleManagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
