import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CardsService } from 'src/app/services/cards.service';
import { LoginComponent } from '../login/login.component';
import { ModalserviceComponent } from '../modalservice/modalservice.component';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  userInfo: any;
  services: any;

  constructor(private cardService: CardsService, public authService: AuthService, private dialog: MatDialog,
    private router: Router) { 
    this.cardService.getServices().then(cards => {
      if (cards != undefined) {
        cards.subscribe(card => {
          this.services = card.map(cardRef => {
            const data = cardRef.payload.doc.data();
            return data;
          });
        });
      }

    });
    }

  async ngOnInit() {
    (await this.authService.userData())?.subscribe((async userData => {
      const userInfo = userData.data();
      this.userInfo = userInfo;
    }));
    return;
  }

  info(data: any) {

    // if (this.userInfo) {
    //   console.log(data);
    // } else {
    //   this.loginModal();
    // }
    this.dialog.open(ModalserviceComponent);
    this.cardService.serviceInfo = data;
  }

  loginModal(): void {
    this.dialog.open(LoginComponent, {
      height: '800px',
      width: '600px',
    });
  }

  serviceModal(): void {
    
  }


}
