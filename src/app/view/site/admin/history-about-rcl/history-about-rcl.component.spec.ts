import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAboutRclComponent } from './history-about-rcl.component';

describe('HistoryAboutRclComponent', () => {
  let component: HistoryAboutRclComponent;
  let fixture: ComponentFixture<HistoryAboutRclComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryAboutRclComponent]
    });
    fixture = TestBed.createComponent(HistoryAboutRclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
