import { UserStoryComponent } from './../user-story/user-story.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from './../model/game';
import { ModalComponent } from "ng2-bs3-modal/components/modal";



@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit {
  @ViewChild(UserStoryComponent)
  UserStoryComponent: UserStoryComponent;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  open() {
    console.log("here");
    this.UserStoryComponent.open();
  }

}
