import { TestBed } from '@angular/core/testing';

import { WriteblogService } from './writeblog.service';

describe('WriteblogService', () => {
  let service: WriteblogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteblogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
