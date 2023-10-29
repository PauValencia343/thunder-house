import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPdfComponent } from './room-pdf.component';

describe('RoomPdfComponent', () => {
  let component: RoomPdfComponent;
  let fixture: ComponentFixture<RoomPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomPdfComponent]
    });
    fixture = TestBed.createComponent(RoomPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
