import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  userName: string;
  userPass: string;
  verifyPass: string;
  passValid: boolean;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit() {

  }

  onSubmit() {
      firebase.auth().createUserWithEmailAndPassword(this.userName, this.userPass).catch(function (error: any) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert(errorMessage)
      }
      console.log(error);
    });
  }
}
