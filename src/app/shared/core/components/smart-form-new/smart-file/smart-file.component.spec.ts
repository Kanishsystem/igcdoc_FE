import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFileComponent } from './smart-file.component';

describe('SmartFileComponent', () => {
  let component: SmartFileComponent;
  let fixture: ComponentFixture<SmartFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
