//import { UserSelectedCard } from './../model/userSelectedCard';
//import { Story } from './../model/story';
import { UserGame } from './../model/userGame';
//import { UserService } from './../shared/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
//import { GameUser } from "app/model/gameUser";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
//import { Subject } from "rxjs/Subject";
//import 'rxjs/first';
//import 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class UserGameService {


  constructor(private auth: AngularFireAuth,
    private db: AngularFireDatabase) { }
  
  userInfo: UserGame = new UserGame();
  UserGameKey: string; 

  createUserGame(userGame: UserGame, gameKey: string) {
    
    userGame.createdBy = this.auth.auth.currentUser.displayName;
    userGame.createdByUid = this.auth.auth.currentUser.uid;
    userGame.createdDate = Date();
    console.log("user-game.service createUserGame", userGame.name);
    let storyPointGame = this.db.object(`user-game/${this.auth.auth.currentUser.uid}/${gameKey}`);
    var newGameRef = storyPointGame.set(userGame);
    
  }

  getUserGames(): FirebaseListObservable<any[]> {
    console.log("user-game.service getUserGames");
    //return this.db.list("game"); //.map(arr => { return arr.reverse(); });
    //return this.db.list("game", { query: { orderByChild: 'createDate' } });
    return this.db.list(`user-game/${this.auth.auth.currentUser.uid}`, { query: { orderByChild: 'createDate' } });
  }

  deleteUserGame(gameKey: string, userKey: string) {
    
        console.log("user-game.service userKey gameKey = ", userKey, gameKey);
        var gameToRemove = this.db.list(`user-game/${userKey}/${gameKey}`)
        gameToRemove.remove();
    
      }

}

