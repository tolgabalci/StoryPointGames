import { TestBed, inject } from '@angular/core/testing';

import { StoryResolverService } from './story-resolver.service';

describe('StoryResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryResolverService]
    });
  });

  it('should be created', inject([StoryResolverService], (service: StoryResolverService) => {
    expect(service).toBeTruthy();
  }));
});
