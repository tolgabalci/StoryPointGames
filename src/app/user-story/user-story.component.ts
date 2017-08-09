import { Story } from 'app/model/story';
import { Observable } from 'rxjs';
import { Game } from './../model/game';
import { GameService } from './../services/game.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/components/modal";


@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  @ViewChild('modal')
  public modal: ModalComponent;
  game: Game = new Game();
  story: Story = new Story();
  currentMode: string;
  modeVerbiage: string;
  hideLink: boolean;
  gameLink: string;
  stories: any[];
  hideSubmit: boolean;

  constructor(private gameService: GameService) {

  }


  open(game: Game, story: Story, mode: string) {
    this.game = game;
    this.currentMode = mode;
    switch (this.currentMode) {
      case "Add":
        this.story = new Story();
        this.hideSubmit = false;
        this.modeVerbiage = "Add User Story";
        break;
      case "Edit":
        this.story = story;
        this.hideSubmit = false;
        this.modeVerbiage = "Edit User Story";
        break;
      case "AddFromCreateGame":
        this.story = new Story();
        this.modeVerbiage = "Add User Stories";
        this.hideLink = false;

        console.log("game.name here ", this.game.name);
        this.gameLink = "https://storypointgames.com/game/" + this.game.$key;
        console.log('game is ', this.game.$key)
        this.gameService.getGameStories(this.game.$key)
          .subscribe(stories => { this.stories = stories });
        break;
      default:
        break;
    }

    this.modal.open();
  }

  onSubmitStory() {
    switch (this.currentMode) {
      case "Add":
        this.gameService.createStory(this.game.$key, this.story);
        break;
      case "Edit":
        this.gameService.updateStory(this.game.$key, this.story);
        break;
      case "AddFromCreateGame":
        this.gameService.createStory(this.game.$key, this.story);
        break;
      default:
        break;
    }



  }



  deleteStory(story: Story) {
    this.gameService.deleteGameStory(this.game.$key, story.$key);
  }

  ngOnInit() {
    this.hideLink = true;
    this.hideSubmit = true;

    this.modal.onDismiss.subscribe(() => console.log("onDismiss was hit"));
  }

}
