import { Game } from './../model/game';
//import { UserService } from './../shared/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';


@Injectable()
export class GameService {

  constructor(private auth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  createGame(game: Game) {
    game.createdBy = this.auth.auth.currentUser.displayName;
    game.createdDate = Date();
    game.status = "Open";
    console.log("createGame service, creating game: ", game.name);
    let storyPointGameRef = this.db.list("game").$ref;
    storyPointGameRef.ref.push(game);
  }
}
