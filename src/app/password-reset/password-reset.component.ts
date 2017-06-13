import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  emailAddress: string;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  recoverPass() {
    console.log("Entering recoverPass()");
    
    if (!this.emailAddress) {
      alert("Please enter a valid email address.");
    } else {
      this.auth.auth.sendPasswordResetEmail(this.emailAddress).then(function () {
        alert("Email sent.");
      }, function (error) {
        alert(error.message);
      });
      this.router.navigate(["/about"]);
    }
  }

}
