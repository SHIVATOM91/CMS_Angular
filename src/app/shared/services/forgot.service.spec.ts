import { TestBed, inject } from '@angular/core/testing';

import { ForgotService } from './forgot.service';

describe('ForgotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotService]
    });
  });

  it('should be created', inject([ForgotService], (service: ForgotService) => {
    expect(service).toBeTruthy();
  }));
});
