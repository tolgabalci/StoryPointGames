import { Observable } from 'rxjs';
import { Game } from './../model/game';
import { GameService } from './../services/game.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/components/modal";


@Component({
  selector: 'app-game-link',
  templateUrl: './game-link.component.html',
  styleUrls: ['./game-link.component.css']
})
export class GameLinkComponent implements OnInit {
  @ViewChild('modal')
  public modal: ModalComponent;
  game: Game = new Game();
  gameLink: string;

  constructor() {

  }

  open(game: Game) {
    this.game = game;
    this.gameLink = "https://storypointgames.com/game/" + this.game.$key;
    this.modal.open();
  }

  ngOnInit() {
  }

}
