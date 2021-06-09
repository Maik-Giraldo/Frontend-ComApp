import { TestBed } from '@angular/core/testing';

import { CarritoGuard } from './carrito.guard';

describe('CarritoGuard', () => {
  let guard: CarritoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CarritoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
