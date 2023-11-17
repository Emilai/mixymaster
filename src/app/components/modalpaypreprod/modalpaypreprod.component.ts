import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardsService } from 'src/app/services/cards.service';
import { SuccesspayComponent } from '../successpay/successpay.component';
import { WrongpayComponent } from '../wrongpay/wrongpay.component';
import { Auth } from '@angular/fire/auth';
import { PreprodService } from 'src/app/services/preprod.service';
import { Router } from '@angular/router';

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

  data = true;

  constructor(
    private cardService: CardsService,
    private dialog: MatDialog,
    private auth: Auth,
    private preprod: PreprodService,
    private router: Router,
    public dialogRef: MatDialogRef<ModalpaypreprodComponent>
  ) { }

  ngOnInit(): void {
    this.production = this.cardService.payPreProduction;
  }

  pay() {
    this.data = false;
    this.paypalFunc();
  }

  paypalFunc() {

    const price = this.production.precio;
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {

        return actions.order.create({
          purchase_units: [
            {
              description: this.production.descripcion,
              amount: {
                currency_code: 'USD',
                value: price
              }
            }
          ]
        })
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        this.successPay();
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
    this.router.navigateByUrl('/logged');
  }

}
