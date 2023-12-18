import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedComponent } from './components/logged/logged.component';
import { MainComponent } from './components/main/main.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, emailVerified } from '@angular/fire/auth-guard'
import { PayComponent } from './components/pay/pay.component';
import { FaqComponent } from './components/faq/faq.component';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
import { CreditsComponent } from './components/credits/credits.component';
import { HitsComponent } from './components/hits/hits.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['logged']);

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent},
  { path: 'faq', pathMatch: 'full', component: FaqComponent },
  { path: 'logged', component: LoggedComponent,
    ...canActivate(redirectUnauthorizedToLogin) },
  {
    path: 'pay', component: PayComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'credits', component: CreditsComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'verificacion', component: VerificacionComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'hits', component: HitsComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'tutorials', component: TutorialsComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  { path: '**', component: MainComponent,
    ...canActivate(redirectUnauthorizedToLogin) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
