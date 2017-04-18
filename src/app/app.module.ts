import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
// import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Initialize Firebase
var firebase_config = {
  apiKey: "AIzaSyDfnKdvTIh9LakNfb1blrIjC_P842J7MzI",
  authDomain: "storypointgames.firebaseapp.com",
  databaseURL: "https://storypointgames.firebaseio.com",
  projectId: "storypointgames",
  storageBucket: "storypointgames.appspot.com",
  messagingSenderId: "719502068515"
};

// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Google,
//   method: AuthMethods.Redirect
// };


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //AngularFireModule.initializeApp(firebase_config)   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
