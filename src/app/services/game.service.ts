import { Story } from './../model/story';
import { Game } from './../model/game';
//import { UserService } from './../shared/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { GameUser } from "app/model/gameUser";
import { UserSelectedCard } from "app/model/userSelectedCard";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
//import { Subject } from "rxjs/Subject";
//import 'rxjs/first';
//mport 'rxjs/add/operator/first';
import 'rxjs/Rx';

@Injectable()
export class GameService {


  constructor(private auth: AngularFireAuth,
    private db: AngularFireDatabase) { }
  story: Story = new Story();
  game: Game = new Game();
  cardToAdd: UserSelectedCard = new UserSelectedCard();
  userInfo: GameUser = new GameUser();
  storySelected: boolean = false;
  private _cardIsFlipped = new BehaviorSubject<boolean>(false);
  cardIsFlipped$ = this._cardIsFlipped.asObservable();
  //not used
  static DEFAULT_STORY: Story = new Story();
  currentStorySubject: BehaviorSubject<Story> = new BehaviorSubject<Story>(GameService.DEFAULT_STORY);
  currentStory: Observable<Story> = this.currentStorySubject.asObservable();

  createGame(game: Game) {
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
    console.log('what is the story ', story.$key)
    var newStoryRef = storyPointGameStory.push(story);
    story.$key = newStoryRef.key;


  }

  getGameStories(gameKey: string): FirebaseListObservable<any[]> {
    return this.db.list(`game/${gameKey}/stories`)
  }

  getGameUsers(gameKey: string): FirebaseListObservable<any[]> {
    return this.db.list(`game/${gameKey}/users`);
  }

  getGames(): FirebaseListObservable<any[]> {
    console.log("getGames");
    return this.db.list("game", { query: { orderByChild: 'createDate' } });
  }

  getGameByKey(key: string): FirebaseObjectObservable<any> {
    return this.db.object(`game/${key}`)
  }

  getStoryByKey(gameKey: string, storyKey: string): FirebaseObjectObservable<any> {
    return this.db.object(`game/${gameKey}/stories/${storyKey}`)
  }

  getStoryUserCards(gameKey: string, storyKey: string): FirebaseListObservable<any> {
    return this.db.list(`game/${gameKey}/stories/${storyKey}/userSelectedCards`)
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

  deleteUserFromGame(gameKey: string, userKey: string) {
    var userToRemove = this.db.list(`game/${gameKey}/users/${userKey}`)
    userToRemove.remove();
  }

  updateStory(gameKey: string, story: Story) {
    var storyRef = this.db.object(`game/${gameKey}/stories/${story.$key}`);
    storyRef.update(story);
  }

  updateGameUser(gameKey: string, user: GameUser) {
    var userRef = this.db.object(`game/${gameKey}/users/${user.$key}`)
    userRef.update(user);
  }

  addUserToGame(gameKey: string, uid: string) {
    this.userInfo.status = "Active";
    this.userInfo.displayName = this.auth.auth.currentUser.displayName;
    var gameRef = this.db.object(`game/${gameKey}/users/${uid}`);
    gameRef.update(this.userInfo);
  }

  addCardToStory(gameKey: string, storyKey: string, uid: string, value: string, displayName: string) {
    this.cardToAdd.displayName = displayName;
    this.cardToAdd.value = value;
    var storyCardRef = this.db.object(`game/${gameKey}/stories/${storyKey}/userSelectedCards/${uid}`);
    storyCardRef.update(this.cardToAdd);
  }

  getCurrentStory(gameKey: string): Observable<Story> {
    var currentStory: FirebaseListObservable<Story[]> = this.db.list(`game/${gameKey}/stories`, {
      query: {
        orderByChild: 'currentlySelectedStory',
        equalTo: true
      }
    });


    return currentStory
      .filter(stories => stories !== undefined && stories.length > 0)
      .map(stories => stories[0]);
  }

  stories: FirebaseListObservable<any>;
  markAsCurrentStory(gameKey: string, newStoryKey: string, oldStoryKey: string) {
    console.log("newStoryKey oldStoryKey", newStoryKey, oldStoryKey);
    this.stories = this.db.list(`game/${gameKey}/stories`);
    var storySubscription = this.stories.subscribe(
      stories => {
        stories.forEach(story => {
          var storyRef = this.db.object(`game/${gameKey}/stories/${story.$key}`);
          story.currentlySelectedStory = false;
          storyRef.update(story);
        })
      });
    storySubscription.unsubscribe();

    this.storySelected = true;
    var newStory = this.db.object(`game/${gameKey}/stories/${newStoryKey}`);
    storySubscription = newStory.subscribe(myStory => { this.story = myStory });
    this.story.currentlySelectedStory = true;
    newStory.update(this.story);
    storySubscription.unsubscribe();

  }

  markFlippedFlag(gameKey: string, storyKey: string, setState: string) {
    var theStory = this.db.object(`game/${gameKey}/stories/${storyKey}`);
    var storySubscription = theStory.subscribe(myStory => this.story = myStory);
    console.log("flippedflag store ", this.story.title);
    switch (setState) {
      case "hidden":
        this.story.cardsHideBack = true;
        this.story.cardsHideFront = false;
        break;
      case "unhidden":
        this.story.cardsHideBack = false;
        this.story.cardsHideFront = true;
        break;
      default:
        break;
    }
    theStory.update(this.story);
    storySubscription.unsubscribe();
  }

}
