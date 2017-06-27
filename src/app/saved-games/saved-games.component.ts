import { UserStoryComponent } from './../user-story/user-story.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { Game } from './../model/game';
import { GameService } from './../services/game.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { GameComponent } from './../game/game.component';
import { ModalComponent } from "ng2-bs3-modal/components/modal";
import { Story } from 'app/model/story';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css'],

})
export class SavedGamesComponent implements OnInit {
  @ViewChild(UserStoryComponent)
  UserStoryComponent: UserStoryComponent;
  storyToEdit: Story = new Story();
  game: Game = new Game();
  games: any[];
  currentUsersGame: boolean = false;

  constructor(private router: Router, private gameService: GameService, private toastrService: ToastrService, private auth: AngularFireAuth) {
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

  selectGame(game) {
    //this.gameService.createGame(this.newGame);
    this.router.navigate(['game', game.$key]);
    this.gameService.addUserToGame(game.$key, this.auth.auth.currentUser.uid);
  }

  joinGame(game) {
    this.gameService.addUserToGame(game.$key, this.auth.auth.currentUser.uid);
    console.log("game key: ", game.$key);
    this.router.navigate(['game', game.$key]);
  }

  addStories(game) {
    this.UserStoryComponent.open(this.game, this.storyToEdit, "AddFromCreateGame");
  }

  ngOnInit() {

  }

}
