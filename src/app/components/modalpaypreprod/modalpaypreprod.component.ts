import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardsService } from 'src/app/services/cards.service';
import { SuccesspayComponent } from '../successpay/successpay.component';
import { WrongpayComponent } from '../wrongpay/wrongpay.component';
import { Auth } from '@angular/fire/auth';
import { PreprodService } from 'src/app/services/preprod.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MailnotificationService } from 'src/app/services/mailnotification.service';

declare var paypal: any;

@Component({
  selector: 'app-modalpaypreprod',
  templateUrl: './modalpaypreprod.component.html',
  styleUrls: ['./modalpaypreprod.component.css']
})
export class ModalpaypreprodComponent implements OnInit {

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;
  production: any;
  userInfo: any;

  data = true;

  constructor(
    private cardService: CardsService,
    private dialog: MatDialog,
    private auth: Auth,
    private preprod: PreprodService,
    private authService: AuthService,
    private router: Router,
    private mns: MailnotificationService,
    public dialogRef: MatDialogRef<ModalpaypreprodComponent>
  ) { }

  async ngOnInit(): Promise<void> {
    this.production = this.cardService.payPreProduction;
    (await this.authService.userData())?.subscribe((async userData => {
      const userInfo = userData.data();
      this.userInfo = userInfo;
      console.log('Usuario: ', this.userInfo);
    }));
  }

  pay() {
    this.data = false;
    // this.paypalFunc();
    this.payWithCredits();
  }

  async payWithCredits() {
    const price = this.production.precio;
    const credits = this.userInfo.creditos;
    const path = 'usuarios';
    const id = this.userInfo.id;

    if (price > credits) {
      console.log('No hay suficientes creditos para pagar');
      this.wrongPay();
    } else {
      // Debemos poner una opcionde confirmacion
      // Sebemos poner una Progress Bar que indique el proceso y luego Alert de Confirmacion
      console.log('Se puede pagar con creditos');
      this.userInfo.creditos = this.userInfo.creditos - price;
      this.userInfo.hits = this.userInfo.hits + (price / 10);
      console.log('Nuevo credito: ', this.userInfo.creditos, 'Crs');
      await this.authService.createUser(this.userInfo, path, id);
      await this.successPay();
    }
  }

  // paypalFunc() {

  //   const price = this.production.precio;
  //   paypal.Buttons({
  //     createOrder: (data: any, actions: any) => {

  //       return actions.order.create({
  //         purchase_units: [
  //           {
  //             description: this.production.descripcion,
  //             amount: {
  //               currency_code: 'USD',
  //               value: price
  //             }
  //           }
  //         ]
  //       })
  //     },
  //     onApprove: async (data: any, actions: any) => {
  //       const order = await actions.order.capture();
  //       this.successPay();
  //     },
  //     onError: (err: any) => {
  //       console.log(err);
  //     },
  //     onCancel: () => {
  //       this.wrongPay();
  //     }
  //   })
  //     .render(this.paypalElement.nativeElement);
  // }

  async successPay(): Promise<void> {
    await this.setProduction();
    await this.preprod.deletePreProduction(this.auth.currentUser?.uid, this.production.id);
    this.dialog.open(SuccesspayComponent);
    this.router.navigateByUrl('/logged');
    this.dialogRef.close();
  }

  wrongPay(): void {
    this.dialog.open(WrongpayComponent);
    this.router.navigateByUrl('/logged');
    this.dialogRef.close();
  }

  async setProduction() {
    this.production.estado = 'Preproducción';
    const userId = this.auth.currentUser?.uid

    const prodID = this.production.nombre.split(' ').join('-')
    this.production.id = prodID;

    await this.preprod.setProductions(userId, this.production, prodID);
    await this.mns.mailProduction(this.userInfo.nombre, this.userInfo.email, this.production.data.servicio, prodID);
    await this.mns.mailToMixyProduction(this.userInfo.nombre, this.userInfo.email, this.production.data.servicio, prodID, this.production.precio);
    this.router.navigateByUrl('/logged');
  }


}
