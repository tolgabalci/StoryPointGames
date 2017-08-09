
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-name-update',
  templateUrl: './name-update.component.html',
  styleUrls: ['./name-update.component.css']
})
export class NameUpdateComponent implements OnInit {

  userName: string;

  constructor(private authService: AngularFireAuth, private rt: Router) { }

  ngOnInit() {
  }


/*
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
*/
    updateUsername() {
      if (!this.userName) {
      alert("Please enter a valid Username.");
    } else {
        this.authService.auth.currentUser.updateProfile(
        {
          displayName: this.userName,
          photoURL: "http://i.stack.imgur.com/34AD2.jpg"
        }
      ).then(() => {
         alert("Username updated.");
        this.rt.navigate(["account"]);
      }, function (error) {
        alert(error.message);
      });
    }
    }}



      
      


      
       
   
  


