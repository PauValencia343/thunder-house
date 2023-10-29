import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogBookManagementComponent } from './log-book-management.component';

describe('LogBookManagementComponent', () => {
  let component: LogBookManagementComponent;
  let fixture: ComponentFixture<LogBookManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogBookManagementComponent]
    });
    fixture = TestBed.createComponent(LogBookManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
