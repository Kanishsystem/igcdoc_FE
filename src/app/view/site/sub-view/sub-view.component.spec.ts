import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubViewComponent } from './sub-view.component';

describe('SubViewComponent', () => {
  let component: SubViewComponent;
  let fixture: ComponentFixture<SubViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubViewComponent]
    });
    fixture = TestBed.createComponent(SubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
