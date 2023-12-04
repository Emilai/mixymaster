import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccesspayComponent } from '../successpay/successpay.component';
import { WrongpayComponent } from '../wrongpay/wrongpay.component';
import { PreprodService } from 'src/app/services/preprod.service';
import firebase from 'firebase/compat';

declare var paypal: any;

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  userInfo: any;
  creditsToBuy: any;
  paypalVar = false;
  spinner = false;
  codes: any;
  promoCode: any;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private preprodService: PreprodService
  ) { }

  async ngOnInit(): Promise<void> {

    (await this.authService.userData())?.subscribe((async userData => {
      const userInfo = userData.data();
      this.userInfo = userInfo;
      console.log('Usuario: ', this.userInfo);
    }));

    (await this.authService.codes())?.subscribe(userData => {
      const codeInfo = userData.data();
      this.codes = codeInfo;
    });
    
  }

  pay() {
    console.log('Vamos a pagar: ', this.creditsToBuy, ' USD');
    this.paypalVar = true;
    this.paypalFunc();
  }

  volver() {
    window.location.reload();
  }

    paypalFunc() {

      const price = parseInt(this.creditsToBuy);
      const priceCalc = Math.round((price * 1.054) + 0.3);
      const path = 'usuarios';
      const id = this.userInfo.id;

    paypal.Buttons({

      createOrder: (data: any, actions: any) => {
        
        return actions.order.create({
          purchase_units: [
            {
              description: 'Compra Creditos MixyMaster',
              amount: {
                currency_code: 'USD',
                value: priceCalc
              }
            }
          ]
        })
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        this.userInfo.creditos = this.userInfo.creditos + price;
        await this.authService.createUser(this.userInfo, path, id);
        await this.preprodService.buyedCreditsHistory(order, this.userInfo.id);
        await this.successPay();
        // await this.volver();
      },
      onError: (err: any) => {
        console.log(err);
      },
      onCancel: () => {
        this.wrongPay();
      }
    })
      .render(this.paypalElement.nativeElement);
  }

  successPay(): void {
    console.log('ejecutado succesPay()');
    const dialogRef = this.dialog.open(SuccesspayComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.volver();
    });
  }

  wrongPay(): void {
    const dialogRef = this.dialog.open(WrongpayComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.volver();
    });
  }

  async promo(codigo: string) {

    const code = codigo.toLowerCase();
    const path = 'usuarios';

    this.spinner = true;

    if (this.codes[code]) {
      // console.log(this.authService.userInfo);
      this.userInfo.creditos = this.userInfo.creditos + this.codes[code];
      await this.authService.createUser(this.userInfo, path, this.userInfo.id);

      //Consultar con Cesar la logica, codigos de un unico uso, etc

      this.spinner = false;
      alert('Codigo Confirmado. Tus cr[editos han sido cargados');
    } else {
      this.spinner = false;
      alert('Codigo erroneo. Por favor intente denuevo');
    }
  }

}
