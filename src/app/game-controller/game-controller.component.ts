import { Story } from 'app/model/story';
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
  selectedRow: Story = new Story;
  stories: any[];
  game: Game = new Game();
  storyToDelete: Story = new Story();
  storyToEdit: Story = new Story();

  @Output() flip: EventEmitter<any> = new EventEmitter();
  @Output() selectStory: EventEmitter<any> = new EventEmitter();


  constructor(private router: ActivatedRoute, private gameService: GameService) {

    this.router.data
      .subscribe(data => this.game = data.game);

    this.gameService.getGameStories(this.game.$key)
      .subscribe(stories => { this.stories = stories });

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
    // this.selectStory.emit(story.storyId);
    this.selectedRow = story;


  }

}
