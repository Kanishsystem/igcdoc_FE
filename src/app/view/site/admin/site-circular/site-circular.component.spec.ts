import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCircularComponent } from './site-circular.component';

describe('SiteCircularComponent', () => {
  let component: SiteCircularComponent;
  let fixture: ComponentFixture<SiteCircularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteCircularComponent]
    });
    fixture = TestBed.createComponent(SiteCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
