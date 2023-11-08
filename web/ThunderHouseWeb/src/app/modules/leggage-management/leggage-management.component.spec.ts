import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeggageManagementComponent } from './leggage-management.component';

describe('LeggageManagementComponent', () => {
  let component: LeggageManagementComponent;
  let fixture: ComponentFixture<LeggageManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeggageManagementComponent]
    });
    fixture = TestBed.createComponent(LeggageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
