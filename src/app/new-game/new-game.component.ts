import { GameService } from './../services/game.service';
import { Game } from './../model/game';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  
  newGame: Game = new Game();
  newName: string;
  form: FormGroup;

  constructor(private router: Router, private gameService: GameService, public fb: FormBuilder) { 
    this.form = fb.group({

    });

  }

  ngOnInit() {
    
  }


  onSubmitSavePlay() {
    console.log("newListItem = ", this.newGame.name);     
    
    //this.gameService.game = this.newGame;
    this.gameService.createGame(this.newGame);
    this.router.navigate(['game',this.newGame.$key]);

  }



}
