import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user: Observable<firebase.User>;
  userEmail: string;
  userPass: string;

  constructor(private auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  ngOnInit() { }

  login(loginType: string) {
    console.log("login button pressed");
    switch (loginType) {
      case "google":
        {
          this.auth.auth.signInWithRedirect(new
            firebase.auth.GoogleAuthProvider())
        }
      case "custom": {
        this.auth.auth.signInWithEmailAndPassword(this.userEmail, this.userPass)
          .catch(function (error: any) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode) {
              alert(errorMessage);
            }
          })
        this.userEmail = "";
        this.userPass = "";
      }
    }
  };

  logout() {
    console.log("logout button pressed");
    this.auth.auth.signOut();
  };

}
