import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class LoggedInGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.auth.currentUser === null){
      alert('you are not welcome here')
      this.router.navigate(["/about"])
      return false;      
    }
    else
    {
      alert('you are my hero')
      return true;
    }
  }

  constructor(private authService: AngularFireAuth, private router: Router ) {



   }

}
