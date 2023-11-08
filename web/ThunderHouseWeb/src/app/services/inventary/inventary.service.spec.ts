import { TestBed } from '@angular/core/testing';
import { InventaryService } from './inventary.service';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

describe('InventaryService', () => {
  let service: InventaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega HttpClientModule a los imports
    });
    service = TestBed.inject(InventaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
