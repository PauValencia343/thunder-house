import { TestBed } from '@angular/core/testing';
import { RolesService } from './roles.service';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega HttpClientModule a los imports
    });
    service = TestBed.inject(RolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
