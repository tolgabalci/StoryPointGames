import { Game } from './../model/game';
import { GameService } from './../services/game.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css'],
  
})
export class SavedGamesComponent implements OnInit {
 
  game: Game = new Game();
  games: any[];

  constructor(private route: Router, private gamesService: GameService, private toastrService: ToastrService ) { }

  showSuccess() {
    this.toastrService.success('Hello world!', 'Toastr fun!');

  }

  deleteAGame(game) {
    
    console.log("game to delete = ", game.name, game.$key);
    //console.log("store name = ", store.text);
    this.gamesService.deleteGame(game, game.$key);
    this.gamesService.getGames()
      .subscribe(gamesData => { this.games = gamesData });
    
  }

  // setConfirmDeleteData(game) {
  //   console.log("comfirm delete ", game.name)
  //   this.game = game;
  // }

  ngOnInit() {
    this.gamesService.getGames()
      .subscribe(gamesData => { this.games = gamesData });
  }

}
