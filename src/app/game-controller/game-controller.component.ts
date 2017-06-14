import { GameUser } from './../model/gameUser';
import { AngularFireAuth } from 'angularfire2/auth';
import { Story } from 'app/model/story';
import { GameComponent } from './../game/game.component';
import { GameService } from './../services/game.service';
import { UserStoryComponent } from './../user-story/user-story.component';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
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
  stories: any[];
  gameUsers: any[];
  game: Game = new Game();
  storyToDelete: Story = new Story();
  storyToEdit: Story = new Story();
  currentIcon: string = "break fa fa-coffee";
  currentTip: string = "Step Away";

  @Input() selectedStory: Story = new Story;

  @Output() flip: EventEmitter<any> = new EventEmitter();
  @Output() selectStory: EventEmitter<Story> = new EventEmitter<Story>();

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private gameService: GameService, private auth: AngularFireAuth) {

    this.activatedRouter.data
      .subscribe(data => this.game = data.game);

    this.gameService.getGameStories(this.game.$key)
      .subscribe(stories => { this.stories = stories });
    
    this.gameService.getGameUsers(this.game.$key)
      .subscribe(users => { this.gameUsers = users});
    
  }

  ngOnInit() {

  }

  editStory(story: Story) {
    console.log("game-controller-component story: ", story.title)
    this.UserStoryComponent.open(this.game, story, "Edit");
  }

  deleteStory(story: Story) {
    this.gameService.deleteGameStory(this.game.$key, story.$key);
  }

  openAddUserStory() {
    console.log("here");
    this.UserStoryComponent.open(this.game, this.storyToEdit, "Add");
  }
  
  flipCards() {
    this.flip.emit(null);
  }

  selectUserStory(story: Story) {
    console.log("game-controller-component story selected from tab: ", story.title)
    this.selectStory.emit(story);
  }

  leaveGame(user: GameUser) {
    this.gameService.deleteUserFromGame(this.game.$key, user.$key);
    this.router.navigate(['dashboard']);
  }

  setUserStatus(user: GameUser) {
    if (user.status == "Away") {
      this.currentIcon = "break fa fa-coffee";
      this.currentTip = "Step Away";
      user.status = "Active";     
    }
    else {
      this.currentIcon = "active fa fa-user";
      this.currentTip = "Re-join"
      user.status = "Away";
    }
    this.gameService.updateGameUser(this.game.$key, user);
  }
}
