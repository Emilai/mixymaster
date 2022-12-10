import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedComponent } from './components/logged/logged.component';
import { MainComponent } from './components/main/main.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['logged']);

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent},
  {
    path: '', pathMatch: 'full', component: MainComponent
  },
  { path: 'logged', component: LoggedComponent,
    ...canActivate(redirectUnauthorizedToLogin) },
  { path: '**', component: MainComponent,
    ...canActivate(redirectUnauthorizedToLogin) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
