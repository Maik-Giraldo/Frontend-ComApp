import { TestBed } from '@angular/core/testing';

import { CarritoGuardService } from './carrito-guard.service';

describe('CarritoGuardService', () => {
  let service: CarritoGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
