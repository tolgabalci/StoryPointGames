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
  game: Game = new Game();
  storyToDelete: Story = new Story();
  storyToEdit: Story = new Story();



  @Input() selectedStory: Story = new Story;

  @Output() flip: EventEmitter<any> = new EventEmitter();
  @Output() selectStory: EventEmitter<Story> = new EventEmitter<Story>();

  constructor(private router: ActivatedRoute, private gameService: GameService, private auth: AngularFireAuth) {

    this.router.data
      .subscribe(data => this.game = data.game);

    this.gameService.getGameStories(this.game.$key)
      .subscribe(stories => { this.stories = stories });

    //this.gameService.getStoryByKey(this.game.$key)
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

}
