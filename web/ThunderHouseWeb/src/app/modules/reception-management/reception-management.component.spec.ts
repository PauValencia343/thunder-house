import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionManagementComponent } from './reception-management.component';

describe('ReceptionManagementComponent', () => {
  let component: ReceptionManagementComponent;
  let fixture: ComponentFixture<ReceptionManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionManagementComponent]
    });
    fixture = TestBed.createComponent(ReceptionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
