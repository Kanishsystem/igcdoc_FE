import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteActivitiesComponent } from './site-activities.component';

describe('SiteActivitiesComponent', () => {
  let component: SiteActivitiesComponent;
  let fixture: ComponentFixture<SiteActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteActivitiesComponent]
    });
    fixture = TestBed.createComponent(SiteActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
