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
  //story: Story = new Story();
  userInfo: UserGame = new UserGame();
  UserGameKey: string;
  // cardToAdd: UserSelectedCard = new UserSelectedCard();
  //cardToResetVote: UserSelectedCard = new UserSelectedCard();
  //userInfo: GameUser = new GameUser();
  //storySelected: boolean = false;
  //private _cardIsFlipped = new BehaviorSubject<boolean>(false);
  //cardIsFlipped$ = this._cardIsFlipped.asObservable();
  //not used
  //static DEFAULT_STORY: Story = new Story();
  //currentStorySubject: BehaviorSubject<Story> = new BehaviorSubject<Story>(GameService.DEFAULT_STORY);
  //currentStory: Observable<Story> = this.currentStorySubject.asObservable();

  createGame(userGame: UserGame, gameKey: string) {
    //userGame.createdByUid = this.auth.auth.currentUser.uid;
    //userGame.name = 
    //userGame.gameKey = gameKey;
    userGame.createdBy = this.auth.auth.currentUser.displayName;
    userGame.createdDate = Date();
    console.log("createGame service, creating game: ", userGame.name);
    let storyPointGame = this.db.object(`user-game/${this.auth.auth.currentUser.uid}/${gameKey}`);
    var newGameRef = storyPointGame.set(userGame);
    //userGame.$key = newGameRef.key;
  }

  //createStory(gameKey: string, story: Story) {
  //  story.createdBy = this.auth.auth.currentUser.displayName;
  //  story.createdDate = Date();
  //  story.status = "Open";
  //  story.score = "";
  //  story.sequence = 0;
  //  let storyPointGameStory = this.db.list(`game/${gameKey}/stories`)
  //  console.log('what is the story ', story.$key)
  //  var newStoryRef = storyPointGameStory.push(story);
  //  story.$key = newStoryRef.key;


  //}

  getUserGames(): FirebaseListObservable<any[]> {
    console.log("getUserGames");
    //return this.db.list("game"); //.map(arr => { return arr.reverse(); });
    //return this.db.list("game", { query: { orderByChild: 'createDate' } });
    return this.db.list(`user-game/${this.auth.auth.currentUser.uid}`, { query: { orderByChild: 'createDate' } });
  }

  // brians code that i copied to start getUserGames
  //getGames(): FirebaseListObservable<any[]> {
  //  console.log("getUserGames");
  //  //return this.db.list("game"); //.map(arr => { return arr.reverse(); });
  //  return this.db.list("game", { query: { orderByChild: 'createDate' } });
 // }

  getGameStories(gameKey: string): FirebaseListObservable<any[]> {
    return this.db.list(`game/${gameKey}/stories`)
  }

  getGameUsers(gameKey: string): FirebaseListObservable<any[]> {
    return this.db.list(`game/${gameKey}/users`, { query: { orderByChild: 'displayName_NoCase' } });
  }

  getGameByKey(key: string): FirebaseObjectObservable<any> {
    return this.db.object(`game/${key}`)
  }

  getStoryByKey(gameKey: string, storyKey: string): FirebaseObjectObservable<any> {
    return this.db.object(`game/${gameKey}/stories/${storyKey}`)
  }

  getStoryUserCards(gameKey: string, storyKey: string): FirebaseListObservable<any> {
    return this.db.list(`game/${gameKey}/stories/${storyKey}/userSelectedCards`, { query: { orderByChild: 'sequence' } });
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

  deleteGameStoryCards(gameKey: string, storyKey: string) {
    var cardsToRemove = this.db.list(`game/${gameKey}/stories/${storyKey}/userSelectedCards`)
    cardsToRemove.remove();
  }
  /*
  updateStory(gameKey: string, story: Story) {
    var storyRef = this.db.object(`game/${gameKey}/stories/${story.$key}`);
    storyRef.update(story);
  }
  */
  /*
  updateScore(gameKey: string, storyKey: string, score: string) {
    var storyRef = this.db.object(`game/${gameKey}/stories/${storyKey}`);
    this.story.score = score;
    const updateData = {
      score: this.story.score
    };
    storyRef.update(updateData);
  }
  */
  /*
  updateGameUser(gameKey: string, user: GameUser) {
    var userRef = this.db.object(`game/${gameKey}/users/${user.$key}`)
    userRef.update(user);
  }
  */
  //users: FirebaseListObservable<any>;
  //userStoryCards: FirebaseListObservable<any>;
  // storiesForVotes: FirebaseListObservable<any>;
  // selectedStory: string;
  //card: UserSelectedCard = new UserSelectedCard();
  //updateAllVotes(gameKey: string, storyKey: string, udateValue: boolean) {
    //bwe-keep this, possibly need if have to update voted
    // this.storiesForVotes = this.db.list(`game/${gameKey}/stories`)
    // var storiesSubscription = this.storiesForVotes.subscribe(
    //   stories => {
    //     stories.forEach(story => {

    //       if (story.currentlySelectedStory == true) {
    //         this.selectedStory = this.story.$key;
    //       }
    //     });
    //   }
    // )


    //this.users = this.db.list(`game/${gameKey}/users`)
    //var usersSubscription = this.users.subscribe(
     // users => {
     //   users.forEach(user => {
       //   var userRef = this.db.object(`game/${gameKey}/users/${user.$key}`)
         // var theyVoted: boolean = false;
         // const updateData = {
           // voted: theyVoted
         // };
        //  userRef.update(updateData);

       // })
      //});
    //usersSubscription.unsubscribe();

    //this.userStoryCards = this.db.list(`game/${gameKey}/stories/${storyKey}/userSelectedCards`)
    //var userStoryCardsSubscription = this.userStoryCards.subscribe(
    //  userCards => {
      //  userCards.forEach(card => {

        //  var userRef = this.db.object(`game/${gameKey}/users/${card.$key}`);
          //var theyVoted: boolean = true;
          //const updateData = {
            //voted: theyVoted
          //};
          //userRef.update(updateData);
        //});
     // }
   // )
   // userStoryCardsSubscription.unsubscribe();
 // }
  /*
  addUserToGame(gameKey: string, uid: string) {
    this.userInfo.status = "Active";
    this.userInfo.displayName = this.auth.auth.currentUser.displayName;
    this.userInfo.displayName_NoCase = this.auth.auth.currentUser.displayName.toLocaleLowerCase();
    var gameRef = this.db.object(`game/${gameKey}/users/${uid}`);
    gameRef.update(this.userInfo);
  }
  */
  //storyUpdateSequence: Story = new Story();
  //newSequence: number;
  //cardExists: boolean;
  /*
  addCardToStory(gameKey: string, storyKey: string, uid: string, value: string, displayName: string) {

    this.cardExists = false;

    this.cardToAdd.displayName = displayName;
    this.cardToAdd.displayName_NoCase = displayName.toLocaleLowerCase();
    this.cardToAdd.value = value;
    var storyCardRef = this.db.object(`game/${gameKey}/stories/${storyKey}/userSelectedCards/${uid}`);
    var storyCardSub = storyCardRef.subscribe(snapshot => {
      if (snapshot.$exists()) {
        this.cardExists = true;
      }
    });
    storyCardSub.unsubscribe();

    if (!this.cardExists) {
      var storyRef = this.db.object(`game/${gameKey}/stories/${storyKey}`);
      this.storyUpdateSequence.sequence = 1
      var storySub = storyRef.subscribe(myStory => { this.storyUpdateSequence = myStory });
      if (this.storyUpdateSequence.sequence == null) {
        this.newSequence = 1
      }
      else {
        this.newSequence = this.storyUpdateSequence.sequence + 1;
      }

      const updateStoryData = {
        sequence: this.newSequence
      };
      storyRef.update(updateStoryData);
      storySub.unsubscribe();
      this.cardToAdd.sequence = updateStoryData.sequence;
    }
    storyCardRef.update(this.cardToAdd);
    var gameUserRef = this.db.object(`game/${gameKey}/users/${uid}`);
    const updateCardData = {
      voted: true
    };
    gameUserRef.update(updateCardData);
  }
  */
  /*
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
        this.story.score = "";
        break;
      case "unhidden":
        this.story.cardsHideBack = false;
        this.story.cardsHideFront = true;
        break;
      default:
        break;
    }

    const updateData = {
      cardsHideBack: this.story.cardsHideBack,
      cardsHideFront: this.story.cardsHideFront,
      score: this.story.score
    };

    theStory.update(updateData);
    storySubscription.unsubscribe();
  }
  
  uniqueCards: FirebaseListObservable<any>;
  cardArray: string[] = [];
  getScore(gameKey: string, storyKey: string): string {
    //var cards: FirebaseListObservable<UserSelectedCard[]> = this.db.list(`game/${gameKey}/stories/${storyKey}/userSelectedCards`)

    this.uniqueCards = this.db.list(`game/${gameKey}/stories/${storyKey}/userSelectedCards`)
    var storySubscription = this.uniqueCards.subscribe(
      uniqueCards => {
        uniqueCards.forEach(card => {
          var cardRef = this.db.object(`game/${gameKey}/stories/${storyKey}/userSelectedCards/${card.$key}`);
          var cardValue: string = card.value;
          this.cardArray.push(cardValue);
        })
      });
    storySubscription.unsubscribe();
    if (this.cardArray.length == 0)
      return null;

    var modeMap = {},
      maxCount = 1;
    var maxEl: string = "-";

    if (this.cardArray.length == 1) {
      maxEl = this.cardArray[0];
    }
    else {
      for (var i = 0; i < this.cardArray.length; i++) {
        var el = this.cardArray[i];
        if (el == "P") {
          continue;
        }
        if (modeMap[el] == null)
          modeMap[el] = 1;
        else
          modeMap[el]++;

        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }

        else if (modeMap[el] == maxCount) {
          //maxEl += '&' + el;
          maxEl = "Mult";
          maxCount = modeMap[el];
        }
      }
    }
    this.cardArray = [];
    var storyCardRef = this.db.object(`game/${gameKey}/stories/${storyKey}`);
    this.story.score = maxEl;
    const updateData = {
      score: this.story.score
    };

    storyCardRef.update(updateData);
    return maxEl;

  }
   *////////

}
  
