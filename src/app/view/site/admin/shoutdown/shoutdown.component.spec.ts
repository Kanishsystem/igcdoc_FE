import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoutdownComponent } from './shoutdown.component';

describe('ShoutdownComponent', () => {
  let component: ShoutdownComponent;
  let fixture: ComponentFixture<ShoutdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoutdownComponent]
    });
    fixture = TestBed.createComponent(ShoutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
