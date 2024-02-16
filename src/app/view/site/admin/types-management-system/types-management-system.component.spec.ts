import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesManagementSystemComponent } from './types-management-system.component';

describe('TypesManagementSystemComponent', () => {
  let component: TypesManagementSystemComponent;
  let fixture: ComponentFixture<TypesManagementSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypesManagementSystemComponent]
    });
    fixture = TestBed.createComponent(TypesManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
