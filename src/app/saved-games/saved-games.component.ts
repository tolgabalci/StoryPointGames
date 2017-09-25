import { Observable } from 'rxjs/Observable';
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
import { Subscription } from "rxjs/Subscription";

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
  gameSubscription: Subscription;

  constructor(private router: Router, private gameService: GameService, private toastrService: ToastrService, protected auth: AngularFireAuth) {
    console.log('we are in the constructor for saved games')
    this.gameSubscription = this.gameService.getGames()
      .subscribe(gamesData => { this.games = gamesData.reverse() }); // added reverse() to make newest games listed on top

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
    this.gameSubscription.unsubscribe();
    console.log("game name ", game.name);
    this.UserStoryComponent.open(game, this.storyToEdit, "AddFromCreateGame");
    this.UserStoryComponent.modal.onDismiss.subscribe(() => {
      this.gameSubscription = this.gameService.getGames()
        .subscribe(gamesData => { this.games = gamesData })
      console.log("getting games");
    });

  }

  ngOnInit() {

  }

}
