import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private authService: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  letsPlay() {
    if (!this.authService.auth.currentUser)
    {
      console.log('attempting to go to register page');      
      this.router.navigate(["/register"]);
    } else {
      this.router.navigate(["/dashboard"]);
    } 
  } 
}
