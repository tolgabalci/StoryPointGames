import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  hideFront: boolean;
  hideBack: boolean;

  ngOnInit() {
    this.hideFront = false;
    this.hideBack = true;
  }

}
