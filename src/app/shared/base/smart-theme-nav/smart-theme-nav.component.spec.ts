import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartThemeNavComponent } from './smart-theme-nav.component';

describe('SmartThemeNavComponent', () => {
  let component: SmartThemeNavComponent;
  let fixture: ComponentFixture<SmartThemeNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartThemeNavComponent]
    });
    fixture = TestBed.createComponent(SmartThemeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
