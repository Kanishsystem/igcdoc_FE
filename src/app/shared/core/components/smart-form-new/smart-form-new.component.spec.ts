import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormNewComponent } from './smart-form-new.component';

describe('SmartFormNewComponent', () => {
  let component: SmartFormNewComponent;
  let fixture: ComponentFixture<SmartFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartFormNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
