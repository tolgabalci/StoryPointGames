import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-update',
  templateUrl: './email-update.component.html',
  styleUrls: ['./email-update.component.css']
})
export class EmailUpdateComponent implements OnInit {

  userEmail: string;

  constructor(private authService: AngularFireAuth, private rt: Router) { }

  ngOnInit() {
  }

  updateEmail() {
        if (!this.userEmail) {
      alert("Please enter a valid email address.");
    } else {
      this.authService.auth.currentUser.updateEmail(this.userEmail).then(() => {
        alert("Email address updated.");
        this.rt.navigate(["account"]);
      }, function (error) {
        alert(error.message);
      });
    }
  }

}
