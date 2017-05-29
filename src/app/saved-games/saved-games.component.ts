import { Game } from './../model/game';
import { GameService } from './../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css']
})
export class SavedGamesComponent implements OnInit {

  games: any[];

  constructor(private route: Router, private gamesService: GameService) { }

  ngOnInit() {
    this.gamesService.getGames()
      .subscribe(gamesData => { this.games = gamesData });
}

}
