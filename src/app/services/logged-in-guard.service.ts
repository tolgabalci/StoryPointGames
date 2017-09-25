import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class LoggedInGuardService implements CanActivate {

  constructor(private authService: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
   
    console.log("canActivate router", this.router);
    console.log("canActivate route", route);
    console.log("canActivate state", state);
    
    return this.authService.authState
      .map(auth => {
        if (auth === null) {
          if (state.url === "/dashboard") {
            this.router.navigate(["/about"]);
          } else {
            this.router.navigate(["/about"]);
          }
          return false;
        }
        else {
          return true;
        }
      })
      .first();
  }


}
