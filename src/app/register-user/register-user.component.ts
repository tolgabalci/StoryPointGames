import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  userName: string;
  userPass: string;
  verifyPass: string;
  userEmail: string;

  constructor(private authService: AngularFireAuth, private rt: Router) { }

  ngOnInit() {

  }

  onSubmitRegistration() {
    var infoValid = true;

    if (!this.userEmail) {
      alert('Need an email address')
      infoValid = false;
    }

    if (this.userPass !== this.verifyPass) {
      alert('Password does not match');
      infoValid = false;
    }
    if (infoValid) {
      this.createUser();
    }
  }

  onCancel() {
    this.rt.navigate(['/dashboard']);
  }

  createUser() {
    this.authService.auth.createUserWithEmailAndPassword(this.userEmail, this.userPass).then(userData => {
      //userData.displayName = this.userName;     
      this.authService.auth.currentUser.updateProfile(
        {
          displayName: this.userName,
          photoURL: "http://i.stack.imgur.com/34AD2.jpg"
        }
      )
      this.authService.auth.currentUser.sendEmailVerification();
      this.rt.navigate(['/dashboard']);      

    }).catch(function (error: any) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode) {
        alert(errorMessage);
        console.log("Error registering", error);
      }
    });
  }
}
