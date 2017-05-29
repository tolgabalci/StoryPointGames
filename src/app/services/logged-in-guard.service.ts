import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class LoggedInGuardService implements CanActivate {

  constructor(private authService: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
   
    return this.authService.authState
      .map(auth => {
        if (auth === null) {
          alert('you are not welcome here')
          this.router.navigate(["/about"])
          return false;
        }
        else {
          alert('you are my hero')
          return true;
        }
      })
      .first();
  }


}
