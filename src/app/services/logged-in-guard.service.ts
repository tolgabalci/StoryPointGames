import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from "@angular/router";
import { LoginComponent } from 'app/login/login.component';

@Injectable()
export class LoggedInGuardService implements CanActivate {

  constructor(private authService: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    // console.log("canActivate router", this.router);
    // console.log("canActivate route", route);
    // console.log("canActivate state", state);

    return this.authService.authState
      .map(auth => {
        if (auth === null) {
          if (state.url === "/dashboard") {
            this.router.navigate(["/about"]);
          } else {
            // (below code snippet from https://angular.io/guide/router)
            // Set our navigation extras object
            // that passes on our global query params and fragment
            let navigationExtras: NavigationExtras = {
              queryParamsHandling: 'merge',
              preserveFragment: true,
              queryParams: { returnUrl: state.url }
            };

            // Redirect the user
            this.router.navigate(["login"], navigationExtras);
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
