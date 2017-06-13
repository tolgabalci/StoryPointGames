import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

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

  constructor(private authService: AngularFireAuth) { }

  ngOnInit() {
    this.userName = this.authService.auth.currentUser.displayName
    this.userEmail = this.authService.auth.currentUser.email
    this.userProviderID = this.authService.auth.currentUser.providerId
    this.userPhotoURL = this.authService.auth.currentUser.photoURL
    console.log("userauth",this.authService.auth)

  }
  
}
