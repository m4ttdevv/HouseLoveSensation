import { TestBed } from '@angular/core/testing';

import { SearchServiceBar } from './search-service';

describe('SearchService', () => {
  let service: SearchServiceBar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchServiceBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
