import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { RoomManagementService } from './room-management.service';

describe('RoomManagementService', () => {
  let service: RoomManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Agrega HttpClientTestingModule a los imports
      providers: [RoomManagementService], // Debes proporcionar RoomManagementService, no 'service'
    });
    service = TestBed.inject(RoomManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
