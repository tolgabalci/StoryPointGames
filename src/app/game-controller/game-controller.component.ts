import { GameService } from './../services/game.service';
import { UserStoryComponent } from './../user-story/user-story.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from './../model/game';
import { ModalComponent } from "ng2-bs3-modal/components/modal";



@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css'],
  providers: []
})
export class GameControllerComponent implements OnInit {
  @ViewChild(UserStoryComponent)
  UserStoryComponent: UserStoryComponent;

  //game: Game = new Game();
  //gameKey: string;
  game: Game = new Game();


  constructor(private router: ActivatedRoute, private gameService: GameService) { 
    //this.game = gameService.game;
    //console.log("the game " ,this.game.description);
    this.router.data
      .subscribe(data => this.game = data.game);
    console.log("Weeee:",this.game)
  }

  ngOnInit() {
    // this.router.params.subscribe(params => {
    //   this.gameKey = params.key
    // })
    // console.log("The game made it! ", this.gameKey);
    //this.game = this.gameService.getGameByKey(this.gameKey);
  }

  openAddUserStory() {
    console.log("here");
    
    this.UserStoryComponent.open(this.game,"Edit");
  }

}
