import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCustomDialogComponent } from './smart-custom-dialog.component';

describe('SmartCustomDialogComponent', () => {
  let component: SmartCustomDialogComponent;
  let fixture: ComponentFixture<SmartCustomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartCustomDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
