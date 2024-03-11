import { TestBed } from '@angular/core/testing';

import { TimesuckEpisodeService } from './timesuck-episode.service';

describe('TimesuckEpisodeService', () => {
  let service: TimesuckEpisodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesuckEpisodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
