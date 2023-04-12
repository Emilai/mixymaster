import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {

  userInfo: any;
  productions: any = [];

  constructor(
    public authService: AuthService,
    private auth: Auth,
    private cardService: CardsService,
    private router: Router
  ) { }

  async ngOnInit() {
    (await this.authService.userData())?.subscribe((async userData => {
      const userInfo = userData.data();
      this.userInfo = userInfo;

      await this.cardService.getProductions(this.userInfo.id).then(cards => {
        cards?.subscribe(card => {
          this.productions = card.map(cardRef => {
            const data = cardRef.payload.doc.data();
            console.log(this.productions);
            return data;
          });

        });
      });
    }));

    if (this.auth.currentUser?.emailVerified) {
      console.log('El usuario ESTA VERIFICADO')

    } else {
      console.log('El usuario NOOO ESTA VERIFICADO')
      this.router.navigateByUrl('/verificacion');
    }
    return;
  }

  pay() {
    this.router.navigateByUrl('/pay');
  }
}
