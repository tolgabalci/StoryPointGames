import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userName: string;
  userEmail: string;
  providerIsPassword: boolean;
  userPhotoURL: string;
  debug: string;
  inputDisplayName: string;
  inputUserEmail: string;
  inputPassword: string;
  inputPhotoURL: string;

  constructor(private authService: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.userName = user.displayName
      this.userEmail = user.email
      for (var providerData of user.providerData) {
        if (providerData.providerId == 'password') {
          this.providerIsPassword = true;
        }
      }
      this.userPhotoURL = user.photoURL
    });
    console.log("userauth", this.authService.auth)
  }

  logout() {
    console.log("logout button pressed");
    this.authService.auth.signOut();
    this.router.navigate(["/about"]);
  };

  

  updateDisplayName() {
    if (!this.inputDisplayName) {
      alert("Please enter a name you wish to display.");
    } else {
      this.authService.auth.currentUser.updateProfile({
        displayName: this.inputDisplayName,
        photoURL: this.authService.auth.currentUser.photoURL
      }).then(() => {
        alert("Display name updated.");
        this.userName = this.inputDisplayName; // I changed this
        this.inputDisplayName = '';            // I changed this
      }, function (error) {
        alert(error.message);
      });
    }
  };

  updatePhotoURL() {
    if (!this.inputDisplayName) {
      alert("Please enter a name you wish to display.");
    } else {
      this.authService.auth.currentUser.updateProfile({
        displayName: this.userName,
        photoURL: this.inputPhotoURL
      }).then(() => {
        alert("Display name updated.");
        this.userName = this.inputDisplayName; // I changed this
        this.inputDisplayName = '';            // I changed this
      }, function (error) {
        alert(error.message);
      });
    }
  };

  updatePassword() {
    if (!this.inputPassword) {
      alert("Please enter a new password you wish to use.");
    } else {
      this.authService.auth.currentUser.updatePassword(
      this.inputPassword       
      ).then(() => {
        alert("Password updated.");
        
        this.inputPassword = '';
      }, function (error) {            // I changed this
        alert(error.message);
      });
    }
  };




  updateEmail() {
    if (!this.inputUserEmail) {
      alert("Please enter a valid email address.");
    } else {
      this.authService.auth.currentUser.updateEmail(this.inputUserEmail).then(() => {
        alert("Email address updated.");
      }, function (error) {
        alert(error.message);
      });
    }
  };
}
