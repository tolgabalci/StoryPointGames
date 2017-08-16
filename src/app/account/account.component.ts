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
  providerPassword: boolean;
  userPhotoURL: string;
  debug: string;

  constructor(private authService: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.userName = user.displayName
      this.userEmail = user.email
      for( var providerData of user.providerData) {
        if (providerData.providerId == 'password') {
          this.providerPassword = true;
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
}
