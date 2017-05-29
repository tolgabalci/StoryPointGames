import { GameService } from './../services/game.service';
import { Game } from './../model/game';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  newGame: Game = new Game();
  newName: string;

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
  }

  onSubmitSavePlay() {
    //console.log("newListItem = ", this.newGame.shareVelocity);     
    
    this.gameService.createGame(this.newGame);
    this.router.navigate(['game']);

  }

  onSubmitCreate() {
    this.gameService.createGame(this.newGame);
    
  }



}
