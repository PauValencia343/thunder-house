import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieManagementComponent } from './supplie-management.component';

describe('SupplieManagementComponent', () => {
  let component: SupplieManagementComponent;
  let fixture: ComponentFixture<SupplieManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplieManagementComponent]
    });
    fixture = TestBed.createComponent(SupplieManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
