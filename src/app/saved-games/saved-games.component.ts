import { Game } from './../model/game';
import { GameService } from './../services/game.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { GameComponent } from './../game/game.component';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css'],
  
})
export class SavedGamesComponent implements OnInit {
 
  game: Game = new Game();
  games: any[];


  constructor(private router: Router, private gameService: GameService, private toastrService: ToastrService ) {
    this.gameService.getGames()
      .subscribe(gamesData => { this.games = gamesData });
   }

  showSuccess() {
    this.toastrService.success('Hello world!', 'Toastr fun!');

  }

  deleteGame(game) {
    
    console.log("game to delete = ", game.name, game.$key);
    this.gameService.deleteGame(game.$key);
    
  }

  selectGame(game){
    //this.gameService.createGame(this.newGame);
    this.router.navigate(['game',game.$key]);
  }
  ngOnInit() {
    
  }

}
