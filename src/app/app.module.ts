import { GameResolverService } from './services/game-resolver.service';
import { CardDeckService } from './services/card-deck.service';
import { GameService } from "./services/game.service";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NewGameComponent } from './new-game/new-game.component';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { SavedGamesComponent } from './saved-games/saved-games.component';
import { GameComponent } from './game/game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { GameControllerComponent } from './game-controller/game-controller.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { LoggedInGuardService } from './services/logged-in-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserStoryComponent } from './user-story/user-story.component';
import { AccountComponent } from "./account/account.component";


import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { DisplayNameUpdateComponent } from './display-name-update/display-name-update.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { EmailUpdateComponent } from './email-update/email-update.component';
import { NameUpdateComponent } from './name-update/name-update.component';


// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDfnKdvTIh9LakNfb1blrIjC_P842J7MzI",
  authDomain: "storypointgames.firebaseapp.com",
  databaseURL: "https://storypointgames.firebaseio.com",
  projectId: "storypointgames",
  storageBucket: "storypointgames.appspot.com",
  messagingSenderId: "719502068515"
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
    RegisterUserComponent,
    UserStoryComponent,
    AccountComponent,
    PasswordResetComponent,
    DisplayNameUpdateComponent,
    PasswordUpdateComponent,
    EmailUpdateComponent,
    NameUpdateComponent
  ],
  imports: [
    Ng2Bs3ModalModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: "createNewGame", component: NewGameComponent },
      { path: "savedGames", component: SavedGamesComponent },
      { path: "about", component: AboutComponent },
      {
        path: "game/:id", component: GameComponent, resolve: {
          game: GameResolverService
        }
      },
      { path: "dashboard", canActivate: [LoggedInGuardService], component: DashboardComponent },
      { path: "register", component: RegisterUserComponent },
      { path: "userStory", component: UserStoryComponent },
      { path: "account", component: AccountComponent },
      { path: "account/update-email", component: EmailUpdateComponent },
      { path: "account/update-name", component: NameUpdateComponent },
      { path: "recoverPassword", component: PasswordResetComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "**", component: DashboardComponent }
    ]),
    CommonModule,
    ToastrModule.forRoot({ positionClass: "toast-top-center" }),
    BrowserAnimationsModule

  ],
  providers: [GameService, CardDeckService, LoggedInGuardService, GameResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
