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

  constructor(private gameService: GameService) { }

  @ViewChild('modal')
  modal: ModalComponent;
  game: Game = new Game();
  story: Story = new Story();
  modeVerbiage: string;

  open(game: Game, mode: string) {
    this.game = game;
    switch (mode) {
    case "Add":
      this.modeVerbiage = "Add User Story";
      break;
    case "Edit":
      this.modeVerbiage = "Edit User Story";
      break;
    default:
      break;
    }

    this.modal.open();
  }

  onSubmitStory() {
    console.log("Story: ",this.story.title,this.story.description)
    this.gameService.createStory(this.game.$key,this.story);
  }

  ngOnInit() {

  }

}
