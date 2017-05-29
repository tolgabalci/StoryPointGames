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

  constructor(private auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  ngOnInit() { }

  login(loginType: string) {
    if (loginType == "google") {
      console.log("login button pressed");
      this.auth.auth.signInWithRedirect(new
        firebase.auth.GoogleAuthProvider())
    }
  };

  logout() {
    console.log("logout button pressed");
    this.auth.auth.signOut();
  };

}
