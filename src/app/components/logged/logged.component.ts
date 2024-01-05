import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CardsService } from 'src/app/services/cards.service';
import { MatDialog } from '@angular/material/dialog';
import { PayComponent } from '../pay/pay.component';
import { ModalproductionComponent } from '../modalproduction/modalproduction.component';
import { ModalpaypreprodComponent } from '../modalpaypreprod/modalpaypreprod.component';
import { PreprodService } from 'src/app/services/preprod.service';
import { MailnotificationService } from 'src/app/services/mailnotification.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {

  userInfo: any;
  productions: any = [];
  preProductions: any = [];
  displayedColumns: string[] = ['fecha', 'nombre', 'servicio', 'precio', 'pagar'];
  displayedProductionColumns: string[] = ['fecha', 'nombre', 'servicio', 'estado', 'ver', 'cargar'];

  constructor(
    public authService: AuthService,
    private auth: Auth,
    private cardService: CardsService,
    private router: Router,
    private orderPipe: OrderPipe,
    private dialog: MatDialog,
    private preprod: PreprodService,
    private mns: MailnotificationService
  ) { }

  async ngOnInit() {
    (await this.authService.userData())?.subscribe((async userData => {
      const userInfo = userData.data();
      this.userInfo = userInfo;

      await this.cardService.getProductions(this.userInfo.id).then(cards => {
        cards?.subscribe(card => {
          this.productions = card.map(cardRef => {
            const data = cardRef.payload.doc.data();
            return data;
          });
          this.productions = this.orderPipe.transform(this.productions, 'fecha', true);
        });
      });

      await this.cardService.getPreProductions(this.userInfo.id).then(cards => {
        cards?.subscribe(card => {
          this.preProductions = card.map(cardRef => {
            const data = cardRef.payload.doc.data();
            return data;
          });
          console.log('preProds: ', this.preProductions);
          this.preProductions = this.orderPipe.transform(this.preProductions, 'fecha', true);
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

  toCredits() {
    this.router.navigateByUrl('/credits');
  }

  test(coti: any) {
    console.log(coti);
    this.dialog.open(PayComponent);
  }


  openProd(data: any) {
    console.log(data);
    this.cardService.production = data;
    this.dialog.open(ModalproductionComponent);
  }

  contratar(prod: any) {
    console.log(prod);
    this.cardService.payPreProduction = prod;
    this.dialog.open(ModalpaypreprodComponent);
  }

  async del(prod: any) {
    await this.preprod.deletePreProduction(this.auth.currentUser?.uid, prod.id);
  }

}
