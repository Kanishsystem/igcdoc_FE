import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartOrgComponent } from './smart-org.component';

describe('SmartOrgComponent', () => {
  let component: SmartOrgComponent;
  let fixture: ComponentFixture<SmartOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
