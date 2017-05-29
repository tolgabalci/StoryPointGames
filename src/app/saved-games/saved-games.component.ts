import { Game } from './../model/game';
import { GameService } from './../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css']
})
export class SavedGamesComponent implements OnInit {

  games: any[];

  constructor(private route: Router, private gamesService: GameService, private toastrService: ToastrService ) { }

  showSuccess() {
    this.toastrService.success('Hello world!', 'Toastr fun!');
    this.toastrService.error("The man has 6 fingers","Uh-oh");
    this.toastrService.info("Cut one off","Surgury");
    this.toastrService.warning("This is a warning","Warn");
  }

  ngOnInit() {
    this.gamesService.getGames()
      .subscribe(gamesData => { this.games = gamesData });
}

}
