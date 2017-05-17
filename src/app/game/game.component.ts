import { GameControllerComponent } from './../game-controller/game-controller.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  constructor(private router: Router) { }

  hideFront: boolean;
  hideBack: boolean;

  ngOnInit() {
    this.hideFront = false;
    this.hideBack = true;

  }

}


