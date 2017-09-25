import { PasswordResetComponent } from './password-reset/password-reset.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { ModalComponent } from "ng2-bs3-modal/components/modal";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(PasswordResetComponent)
  PasswordResetComponent: PasswordResetComponent;
  title = 'app works!';
  user: Observable<firebase.User>;
  userEmail: string;
  userPass: string;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = auth.authState;
  }

  ngAfterViewInit(): void {
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
