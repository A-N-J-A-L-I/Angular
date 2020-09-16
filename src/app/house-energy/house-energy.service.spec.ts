import { TestBed } from '@angular/core/testing';

import { HouseEnergyService } from './house-energy.service';

describe('HouseEnergyService', () => {
  let service: HouseEnergyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseEnergyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
