import { TestBed } from '@angular/core/testing';

import { ExpiracionIdMesaService } from './expiracion-id-mesa.service';

describe('ExpiracionIdMesaService', () => {
  let service: ExpiracionIdMesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpiracionIdMesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
