import { Story } from 'app/model/story';
import { Game } from './../model/game';
//import { UserService } from './../shared/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
//import { Subject } from "rxjs/Subject";


@Injectable()
export class GameService {

  constructor(private auth: AngularFireAuth,
    private db: AngularFireDatabase) { }
  
  createGame(game: Game)  {
    game.createdBy = this.auth.auth.currentUser.displayName;
    game.createdByUid = this.auth.auth.currentUser.uid
    game.createdDate = Date();
    game.status = "Open";
    console.log("createGame service, creating game: ", game.name);
    let storyPointGame = this.db.list("game");
    var newGameRef = storyPointGame.push(game);
    game.$key = newGameRef.key;    
  }

  createStory(gameKey: string, story: Story) {
    story.createdBy = this.auth.auth.currentUser.displayName;
    story.createdDate = Date();
    story.status = "Open";
    let storyPointGameStory = this.db.list(`game/${gameKey}/stories`)
    var newStoryRef = storyPointGameStory.push(story);
    story.$key = newStoryRef.key;    
  }

  getGameStories(gameKey: string) : FirebaseListObservable<any[]> {
    return this.db.list(`game/${gameKey}/stories`)
  }

  getGames() : FirebaseListObservable<any[]> {
    console.log("getGames");
    return this.db.list("game", { query: { orderByChild: 'createDate' } });
  }

  getGameByKey(key: string) : FirebaseObjectObservable<any> {
    return this.db.object(`game/${key}`)
  }

  getStoryByKey(gameKey: string, storyKey: string) : FirebaseObjectObservable<any> {
    return this.db.object(`game/${gameKey}/${storyKey}`)
  }

  deleteGame(gameKey: string) {
  
    console.log("game name = ", gameKey);
    var gameToRemove = this.db.list(`game/${gameKey}`)
    gameToRemove.remove();

  }

  deleteGameStory(gameKey: string, storyKey: string) {
    var storyToRemove = this.db.list(`game/${gameKey}/stories/${storyKey}`)
    storyToRemove.remove();
  }

  updateStory(gameKey: string, story: Story) {
    var storyRef = this.db.object(`game/${gameKey}/stories/${story.$key}`);
    storyRef.update(story);
  }
}
