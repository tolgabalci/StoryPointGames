import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UserSelectedCard } from 'app/model/userSelectedCard';
import { AngularFireAuth } from 'angularfire2/auth';
import { GameService } from './../services/game.service';
import { UserGameService } from './../services/user-game.service';
import { Story } from './../model/story';
import { Game } from './../model/game';
import { UserGame } from './../model/userGame';
import { CardDeckService } from './../services/card-deck.service';
import { GameControllerComponent } from './../game-controller/game-controller.component';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cards;
  hideFront: boolean;
  hideBack: boolean;
  cardDeck: string;
  game: Game = new Game();
  story: Story = new Story();
  stories: any[];
  currentStories: any[];
  currentCard: string;
  userStoryCards: any[];
  score: string;
  //theCard: string = '100';
  newUserGame: UserGame = new UserGame();
  garyName: string;

  constructor(private router: Router, private _cardDeckService: CardDeckService, private route: ActivatedRoute,
    private gameService: GameService, private auth: AngularFireAuth, private usergameService: UserGameService) {
    this.route.data
      .do(data => console.log("game.component Check for key:", data.game))
      .subscribe(data => this.game = data.game);
    // gomer add it here
    //this.garyName = this.game.name;
    this.newUserGame.name = this.game.name;
    this.newUserGame.createdByUid = this.game.createdByUid;
    this.newUserGame.description = this.game.description;
    this.newUserGame.createdBy = this.game.createdBy; /// using current date and time not saved one
    this.newUserGame.createdDate = this.game.createdDate;
    
    usergameService.addUserGame(this.newUserGame, this.game.$key);

    // this.gameService.getGameStories(this.game.$key)
    //   .subscribe(myStories => {
    //     this.stories = myStories;        
    //});


    this.gameService.getCurrentStory(this.game.$key)
      .do(story => this.story = story)
      .switchMap(story => this.gameService.getStoryUserCards(this.game.$key, story.$key))
      .do(storyCards => { this.userStoryCards = storyCards })
      .switchMap(stories => this.gameService.getGameStories(this.game.$key))
      .subscribe(stories => { this.stories = stories })
    
      

    //.subscribe(storyCards => { this.userStoryCards = storyCards });


  }

  ngOnInit() {


    //this.hideFront = false;
    //this.hideBack = true;

    //console.log("Router data from new game:",this.);

    console.log("card set is.....", this.game.cardSet);
    console.log("game.component.ts game key is.....", this.game.$key);
    this.cardDeck = this.game.cardSet;
    this.cards = this._cardDeckService.getCards(this.cardDeck);
  }

  flipCards() {
    console.log("cardsHideFront ", this.story.cardsHideFront)
    if (this.story.cardsHideFront == false) {
      this.gameService.markFlippedFlag(this.game.$key, this.story.$key, "unhidden");
    } else {
      this.gameService.markFlippedFlag(this.game.$key, this.story.$key, "hidden");
    }
    this.score = this.gameService.getScore(this.game.$key, this.story.$key);
    console.log('flip the cards!');
    //this.hideFront =true;
    //this.hideBack = false;
  }

  resetCards() {
    this.gameService.markFlippedFlag(this.game.$key, this.story.$key, "hidden");
    this.gameService.deleteGameStoryCards(this.game.$key, this.story.$key);
    this.gameService.updateScore(this.game.$key, this.story.$key, "-")
    this.currentCard = null;
    this.cards = this._cardDeckService.getCards(this.cardDeck);
    this.gameService.updateAllVotes(this.game.$key, this.story.$key, true);
  }

  selectedCard(card: string) {

    this.currentCard = card;
    console.log("selected card: ", this.currentCard, this.auth.auth.currentUser.displayName);

    this.gameService.addCardToStory(this.game.$key, this.story.$key, this.auth.auth.currentUser.uid, this.currentCard, this.auth.auth.currentUser.displayName);
    this.gameService.markFlippedFlag(this.game.$key, this.story.$key, "hidden");
    //this.hideFront = false;
    //this.hideBack = true;
  }

  storyChange(event) {
    // this.story = event;
    // this.gameService.getStoryUserCards(this.game.$key, this.story.$key)
    //   .subscribe(storyCards => { this.userStoryCards = storyCards; });
    this.currentCard = null;
    this.cards = this._cardDeckService.getCards(this.cardDeck);

  }

}


