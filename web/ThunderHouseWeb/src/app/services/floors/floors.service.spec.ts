import { TestBed } from '@angular/core/testing';
import { FloorsService } from './floors.service';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

describe('FloorsService', () => {
  let service: FloorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega HttpClientModule a los imports
    });
    service = TestBed.inject(FloorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
