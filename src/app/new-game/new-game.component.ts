import { GameService } from './../services/game.service';
import { Game } from './../model/game';
import { Router } from '@angular/router';
import { Component, OnInit, Renderer, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  newGame: Game = new Game();
  newName: string;
  form: FormGroup;
  submitAttempted: boolean = false;

  public nameInputFocus = new EventEmitter<boolean>();

  constructor(private router: Router, private gameService: GameService, public fb: FormBuilder, private renderer: Renderer, private elementRef: ElementRef) {
    this.form = fb.group({
      name: [null, Validators.required],
      description: null,
      velocity: null,
      cardSet: ['Simple', Validators.required]
    });
  }

  ngOnInit() {

  }

  onSubmitSavePlay() {
    if (!this.form.valid) {
      this.submitAttempted = true;
      this.nameInputFocus.emit(true);
      //this.form.controls['name'].
      return;
    }

    Object.assign(this.newGame, this.form.value);
    console.log("this.newGame", this.newGame);

    this.gameService.createGame(this.newGame);
    this.router.navigate(['game', this.newGame.$key]);
  }
}
