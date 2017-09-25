import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";
import { PasswordResetComponent } from 'app/password-reset/password-reset.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(PasswordResetComponent)
  PasswordResetComponent: PasswordResetComponent;
  title = 'app works!';
  user: Observable<firebase.User>;
  userEmail: string;
  userPass: string;
  returnUrl: string;

  constructor(private auth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    this.user = auth.authState;
  }

  ngOnInit() {
    this.route.queryParamMap
      .do(params => console.log("login queryParams:", params))
      .map(params => this.returnUrl = params.get('returnUrl'))
      .subscribe();
  }

  login(loginType: string) {
    console.log("login button pressed");
    switch (loginType) {
      case "google": {
        this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(auth => {
          if (auth !== null) {
            console.log('Super GARY login complete.', this.returnUrl);
            if (this.returnUrl) {
              this.router.navigateByUrl(this.returnUrl, { replaceUrl: true });
            } else {
              this.router.navigate(["/dashboard"], { replaceUrl: true });
            }
          }
        });
        break;
      }
      case "custom": {
        this.auth.auth.signInWithEmailAndPassword(this.userEmail, this.userPass)
          .then(auth => {
            if (auth !== null) {
              console.log('Super GARY custom login complete.');
              if (this.returnUrl) {
                this.router.navigateByUrl(this.returnUrl, { replaceUrl: true });
              } else {
                this.router.navigate(["/dashboard"], { replaceUrl: true });
              }
            }
          })
          .catch(function (error: any) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode) {
              alert(errorMessage);
            }
          })
        this.userEmail = "";
        this.userPass = "";
        break;
      }
    }
  };

  logout() {
    console.log("logout button pressed");
    this.auth.auth.signOut();
    this.router.navigate(["/about"])
  };


  openPasswordReset() {
    console.log("password reset");
    this.PasswordResetComponent.open();


  }
}
