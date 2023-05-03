import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardsComponent } from './components/cards/cards.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { MatStepperModule } from '@angular/material/stepper';
import { HowitworksComponent } from './components/howitworks/howitworks.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SafePipe } from './pipes/safe.pipe';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedComponent } from './components/logged/logged.component';
import { MainComponent } from './components/main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { SwiperModule } from 'swiper/angular';
import { PayComponent } from './components/pay/pay.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { SuccesspayComponent } from './components/successpay/successpay.component';
import { WrongpayComponent } from './components/wrongpay/wrongpay.component';
import { LoginerrorComponent } from './components/loginerror/loginerror.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FaqComponent } from './components/faq/faq.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RegistererrorComponent } from './components/registererror/registererror.component';
import { RegistersuccessComponent } from './components/registersuccess/registersuccess.component';
import { MatMenuModule } from '@angular/material/menu';
import { ModalserviceComponent } from './components/modalservice/modalservice.component';
import { RegistererrormailComponent } from './components/registererrormail/registererrormail.component';
import { RegisterduplicatedmailComponent } from './components/registerduplicatedmail/registerduplicatedmail.component';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
import { MatTableModule } from '@angular/material/table'
import { OrderPipe } from 'ngx-order-pipe';
import { MatChipsModule } from '@angular/material/chips';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardsComponent,
    JumbotronComponent,
    AboutComponent,
    HowitworksComponent,
    ModalComponent,
    ContactComponent,
    LoginComponent,
    SuccesspayComponent,
    WrongpayComponent,
    RegistererrorComponent,
    RegistererrormailComponent,
    RegisterduplicatedmailComponent,
    RegistersuccessComponent,
    VerificacionComponent,
    LoggedComponent,
    FaqComponent,
    LoginerrorComponent,
    PayComponent,
    MainComponent,
    ModalserviceComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SwiperModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    LayoutModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AngularFireModule, SafePipe, DatePipe, OrderPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
