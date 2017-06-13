import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  emailAddress: string;

  constructor(private auth: AngularFireAuth, private rt: Router) { }

  ngOnInit() {
  }

  async recoverPass() {
    console.log("Entering recoverPass()");
    
    if (!this.emailAddress) {
      alert("Please enter a valid email address.");
    } else {
      this.auth.auth.sendPasswordResetEmail(this.emailAddress).then(() => {
        alert("Email sent.");
        this.rt.navigate(["/about"]);        
      }, function (error) {
        alert(error.message);
      });
    }
  }

}
