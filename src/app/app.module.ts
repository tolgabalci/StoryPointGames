import { GameService } from "./services/game.service";
import { UserService } from './shared/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NewGameComponent } from './new-game/new-game.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { SavedGamesComponent } from './saved-games/saved-games.component';
import { GameComponent } from './game/game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { GameControllerComponent } from './game-controller/game-controller.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

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
    GameComponent,
    DashboardComponent,
    AboutComponent,
    GameControllerComponent,
    RegisterUserComponent
  ],
  imports: [
    Ng2Bs3ModalModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebase_config, myFirebaseAuthConfig),
    RouterModule.forRoot([
      { path: "createNewGame", component: NewGameComponent },
      { path: "savedGames", component: SavedGamesComponent },
      { path: "about", component: AboutComponent },
      { path: "game", component: GameComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "register", component: RegisterUserComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "**", component: DashboardComponent }
    ])

  ],
  providers: [UserService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
