import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app works!';
  user: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = auth.authState;
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }

  login(loginType: string) {
    if (loginType == "google") {
      console.log("login button pressed");

      // this.auth.authState
      //   .subscribe(auth => {
      //     if (this.auth.auth.currentUser !== null) {
      //       console.log('Super GARY login complete.');
      //       this.router.navigate(["/dashboard"]);
      //     }
      //   });

      this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(auth => {
        if (auth !== null) {
          console.log('Super GARY login complete.');
          this.router.navigate(["/dashboard"]);
        }
      });
    }
  };

  logout() {
    console.log("logout button pressed");
    this.auth.auth.signOut();
    this.router.navigate(["/about"])
  };

}
