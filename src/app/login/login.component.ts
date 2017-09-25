import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";

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

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = auth.authState;
  }

  ngOnInit() {
  }

  login(loginType: string) {
    console.log("login button pressed");
    switch (loginType) {
      case "google": {
        this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(auth => {
          if (auth !== null) {
            console.log('Super GARY login complete.');
            this.router.navigate(["/dashboard"]);
          }
        });
        break;
      }
      case "custom": {
        this.auth.auth.signInWithEmailAndPassword(this.userEmail, this.userPass)
          .then(auth => {
            if (auth !== null) {
              console.log('Super GARY custom login complete.');
              this.router.navigate(["/dashboard"]);
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
