import { UserService } from './shared/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NewGameComponent } from './new-game/new-game.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { SavedGamesComponent } from './saved-games/saved-games.component';
import { GameComponent } from './game/game.component';

// Initialize Firebase
var firebase_config = {
  apiKey: "AIzaSyDfnKdvTIh9LakNfb1blrIjC_P842J7MzI",
  authDomain: "storypointgames.firebaseapp.com",
  databaseURL: "https://storypointgames.firebaseio.com",
  projectId: "storypointgames",
  storageBucket: "storypointgames.appspot.com",
  messagingSenderId: "719502068515"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    SavedGamesComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebase_config, myFirebaseAuthConfig),
    RouterModule.forRoot([
      { path: "createNewGame", component: NewGameComponent },
      { path: "savedGames", component: SavedGamesComponent },
    ])

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
