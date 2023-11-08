import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessRoutesGuard } from './access-routes.guard';

describe('accessRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accessRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
