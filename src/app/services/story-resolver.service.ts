import { Story } from 'app/model/story';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GameService } from './game.service';
import { Game } from './../model/game';
import { Injectable } from '@angular/core';

@Injectable()
export class StoryResolverService implements Resolve<Story>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Story | Observable<Story> | Promise<Story> {
    return this.gameService.getStoryByKey(route.params.gameId,route.params.storyId).first();
    
  }

  constructor(private gameService: GameService) { }

}
