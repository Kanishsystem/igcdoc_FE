import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkComplaintsComponent } from './network-complaints.component';

describe('NetworkComplaintsComponent', () => {
  let component: NetworkComplaintsComponent;
  let fixture: ComponentFixture<NetworkComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkComplaintsComponent]
    });
    fixture = TestBed.createComponent(NetworkComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
