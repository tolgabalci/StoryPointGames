import { GameService } from './game.service';
import { Observable } from 'rxjs/Observable';
import { Game } from './../model/game';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

@Injectable()
export class GameResolverService implements Resolve<Game>  {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Game | Observable<Game> | Promise<Game> {
    return this.gameService.getGameByKey(route.params.id).first();
    
  }

  constructor(private gameService: GameService) { }


}
