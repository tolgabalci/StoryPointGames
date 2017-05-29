import { Init } from './../init-cards';
import { Injectable } from '@angular/core';


@Injectable()
export class CardDeckService extends Init {

  constructor() {
    super();
    console.log('CardDeckService Initialized...');
    //this.loadCards();
  }

  getCards(cardDeck) {
    var cards = this.loadCards(cardDeck);
    return cards;
  }

}
