import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImagesComponent } from './home-images.component';

describe('HomeImagesComponent', () => {
  let component: HomeImagesComponent;
  let fixture: ComponentFixture<HomeImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeImagesComponent]
    });
    fixture = TestBed.createComponent(HomeImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
