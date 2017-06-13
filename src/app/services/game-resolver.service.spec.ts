import { TestBed, inject } from '@angular/core/testing';

import { GameResolverService } from './game-resolver.service';

describe('GameResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameResolverService]
    });
  });

  it('should be created', inject([GameResolverService], (service: GameResolverService) => {
    expect(service).toBeTruthy();
  }));
});
