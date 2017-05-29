import { CardDeckService } from './../services/card-deck.service';
import { GameControllerComponent } from './../game-controller/game-controller.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cards;
  hideFront: boolean;
  hideBack: boolean;
  cardDeck: string;
  constructor(private router: Router, private _cardDeckService: CardDeckService) { }


  ngOnInit() {
    this.cardDeck = "Fibonacci";

    this.hideFront = false;
    this.hideBack = true;
    this.cards = this._cardDeckService.getCards(this.cardDeck);

  }




}


