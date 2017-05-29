import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from './../model/game';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit {
  @Input() name: string = "Gerbil";
  constructor() { }

  ngOnInit() {
  }

}
