import { TestBed, inject } from '@angular/core/testing';

import { CardDeckService } from './card-deck.service';

describe('CardDeckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardDeckService]
    });
  });

  it('should ...', inject([CardDeckService], (service: CardDeckService) => {
    expect(service).toBeTruthy();
  }));
});
