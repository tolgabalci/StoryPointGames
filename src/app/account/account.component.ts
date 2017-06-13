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
  userProviderID: string;
  userPhotoURL: string;

  constructor(private authService: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.userName = this.authService.auth.currentUser.displayName
    this.userEmail = this.authService.auth.currentUser.email
    this.userProviderID = this.authService.auth.currentUser.providerId
    this.userPhotoURL = this.authService.auth.currentUser.photoURL
    console.log("userauth",this.authService.auth)

  }
      logout() {
    console.log("logout button pressed");
    this.authService.auth.signOut();
    this.router.navigate(["/about"])
  };
}
