import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLogComponent } from './site-log.component';

describe('SiteLogComponent', () => {
  let component: SiteLogComponent;
  let fixture: ComponentFixture<SiteLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteLogComponent]
    });
    fixture = TestBed.createComponent(SiteLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
