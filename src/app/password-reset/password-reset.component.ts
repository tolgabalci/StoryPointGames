import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from '@angular/router';
import { ModalComponent } from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalComponent;
  emailAddress: string;

  constructor(private authService: AngularFireAuth, private rt: Router) { }

  ngOnInit() {
  }

  open() {
    this.modal.open();
  }

  async recoverPass() {
    console.log("Entering recoverPass()");

    if (!this.emailAddress) {
      alert("Please enter a valid email address.");
    } else {
      this.authService.auth.sendPasswordResetEmail(this.emailAddress).then(() => {
        alert("Email sent.");
        this.rt.navigate(["/about"]);
      }, function (error) {
        alert(error.message);
      });
    }
  }

}
