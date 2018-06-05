import { TestBed, inject } from '@angular/core/testing';

import { DataModalService } from './data-modal.service';

describe('DataModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataModalService]
    });
  });

  it('should be created', inject([DataModalService], (service: DataModalService) => {
    expect(service).toBeTruthy();
  }));
});

