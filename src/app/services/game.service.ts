import { Game } from './../model/game';
import { UserService } from './../shared/user.service';
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';


@Injectable()
export class GameService {

  constructor(private af: AngularFire, private userService: UserService) { }

  createGame(game: Game)
  {
    game.createdBy = this.userService.user.name;    
    game.createdDate = Date();
    game.status = "Open";
    console.log("createGame service, creating game: ",game.name);    
    let storyPointGameRef = this.af.database.list("game").$ref;    
    storyPointGameRef.ref.push(game);
  }
}
