import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';
import { SuccesspayComponent } from '../successpay/successpay.component';
import { WrongpayComponent } from '../wrongpay/wrongpay.component';

declare var paypal:any ;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  cotizacion = {
    servicio: '',
    precioServicio: 0,
    duracion: 0,
    pistas: 0,
    obsesivo: false,
    noVox: false,
    capella: false,
    stems: false,
    stemsDetail: {
      drums: false,
      perc: false,
      guit: false,
      bass: false,
      keys: false,
      bkgVoice: false,
      mainVoice: false,
      others: false
    },
    noMaster: false,
    atmos: false
  }

  coachingId = {
    duracion: 0,
    precio: 0
  }

  inmersiv = {
    tipo: '',
    precio: 0,
    mje: ''
  }

  price = {
    servicio: 0,
    duracion: 0,
    pistas: 0,
    obsesivo: 0,
    noVox: 0,
    capella: 0,
    stems: 0,
    stemsDetail: {
      drums: 0,
      perc: 0,
      guit: 0,
      bass: 0,
      keys: 0,
      bkgVoice: 0,
      mainVoice: 0,
      others: 0
    },
    noMaster: 0,
    atmos: 0,
    total: 0
  }

  asisstant = {
    servicio: '',
    pistas: 1,
    tiempo: 1,
    precio: 0
  }

  orden = {
    descripcion: 'descripcion del servicio',
    precio: 5
  }

  paypalBtn = false;
  cotiCard = false;
  preCoti = true;
  conforme=false;

  constructor( private dialog: MatDialog,
    private auth: Auth,
    private router: Router ) { }

  ngOnInit(): void {
    if (this.auth.currentUser?.emailVerified) {
      console.log('El usuario ESTA VERIFICADO')

    } else {
      console.log('El usuario NOOO ESTA VERIFICADO')
      this.router.navigateByUrl('/verificacion');
    }
  }

  coti() {
    this.priceCalculator();
    this.cotiCard = true;
    this.preCoti = false;
    this.paypalFunc();
  }

  volver() {
    window.location.reload();
  }

  paypalFunc() {

    const price = this.orden.precio;

    paypal.Buttons({

      createOrder: (data: any, actions: any) => {
        
        return actions.order.create({
          purchase_units: [
            {
              description: this.orden.descripcion,
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
  priceCalculator(){

    if(this.cotizacion.servicio === 'premium') {
      this.price.servicio = 5;
      if (this.cotizacion.pistas < 25) {
        this.price.pistas = 0;
        console.log('menos de 25 pistas')
      } else {
        const pistasExtra = this.cotizacion.pistas - 24;
        console.log('pistas extra =', pistasExtra);
        this.price.pistas = pistasExtra * 5;
        console.log( 'precio de las pistas $', this.price.pistas);
      }
    };

    if (this.cotizacion.servicio === 'gold') {
      this.price.servicio = 15;
      if (this.cotizacion.pistas < 41) {
        this.price.pistas = 0;
        console.log('menos de 40 pistas')
      } else {
        const pistasExtra = this.cotizacion.pistas - 40;
        console.log('pistas extra =', pistasExtra);
        this.price.pistas = pistasExtra * 7;
        console.log('precio de las pistas $', this.price.pistas);
      }
    };

    if (this.cotizacion.servicio === 'platinum') {
      this.price.servicio = 35;
      if (this.cotizacion.pistas < 122) {
        this.price.pistas = 0;
        console.log('menos de 120 pistas')
      } else {
        const pistasExtra = this.cotizacion.pistas - 120;
        console.log('pistas extra =', pistasExtra);
        this.price.pistas = pistasExtra * 20;
        console.log('precio de las pistas $', this.price.pistas);
      }
    };

    if(this.cotizacion.duracion < 3.1) {
      this.price.duracion = 0;
      console.log('duracion menor a 3 minutos, sin costo extra');
    } else if (this.cotizacion.duracion > 5) { 
      console.log('duracion mayor a 5 minutos, cotizar manualmente');
    } else {
      const duracionExtra = this.cotizacion.duracion -3;
      console.log('duracion extra = ', duracionExtra);
      this.price.duracion = duracionExtra * 20;
      console.log('precio duracion $', this.price.duracion);
    };

    if (this.cotizacion.noVox) {
      this.price.noVox = 20;
    };

    if (this.cotizacion.capella) {
      this.price.capella = 20;
    };

    if (this.cotizacion.noMaster) {
      this.price.noMaster = 20;
    };

    if (this.cotizacion.atmos) {
      this.price.atmos = 150;
    };

    if (this.cotizacion.stemsDetail.drums) {
      this.price.stemsDetail.drums = 40;
    };

    if (this.cotizacion.stemsDetail.perc) {
      this.price.stemsDetail.perc = 40;
    };

    if (this.cotizacion.stemsDetail.guit) {
      this.price.stemsDetail.guit = 40;
    };

    if (this.cotizacion.stemsDetail.bass) {
      this.price.stemsDetail.bass = 40;
    };

    if (this.cotizacion.stemsDetail.keys) {
      this.price.stemsDetail.keys = 40;
    };

    if (this.cotizacion.stemsDetail.bkgVoice) {
      this.price.stemsDetail.bkgVoice = 40;
    };

    if (this.cotizacion.stemsDetail.mainVoice) {
      this.price.stemsDetail.mainVoice = 40;
    };

    if (this.cotizacion.stemsDetail.others) {
      this.price.stemsDetail.others = 40;
    };

    this.price.stems =
      this.price.stemsDetail.drums +
      this.price.stemsDetail.perc +
      this.price.stemsDetail.guit +
      this.price.stemsDetail.bass +
      this.price.stemsDetail.keys +
      this.price.stemsDetail.bkgVoice +
      this.price.stemsDetail.mainVoice +
      this.price.stemsDetail.others;

    this.price.total = 
    this.price.servicio +
    this.price.duracion +
    this.price.pistas +
    this.price.obsesivo +
    this.price.noVox +
    this.price.capella +
    this.price.stems +
    this.price.noMaster +
    this.price.atmos;

    if (this.cotizacion.obsesivo) {
      this.price.total = this.price.total *1.3;
    };

    console.log('el precio final es $', this.price.total);
    this.orden.precio = Math.floor(this.price.total);
    this.orden.descripcion = this.cotizacion.servicio;

  }

  coaching() {
    const precio = this.coachingId.duracion * 30;
    console.log('pago de coaching es de $', precio);
    this.coachingId.precio = precio;
    this.orden.precio = Math.floor(precio);
    this.orden.descripcion = this.cotizacion.servicio;
    this.cotiCard = true;
    this.preCoti = false;
    this.paypalFunc();
  }

  inmersivo() {
    if (this.inmersiv.tipo === '1') {
      this.inmersiv.precio = 40;
      this.inmersiv.mje = `u$s ${this.inmersiv.precio}`;
      this.orden.descripcion = this.cotizacion.servicio;
      this.orden.precio = this.inmersiv.precio;
      this.cotiCard = true;
      this.preCoti = false;
      this.paypalFunc();
    };
    if (this.inmersiv.tipo === '2') {
      this.inmersiv.precio = 80;
      this.inmersiv.mje = `u$s ${this.inmersiv.precio}`;
      this.orden.descripcion = this.cotizacion.servicio;
      this.orden.precio = this.inmersiv.precio;
      this.cotiCard = true;
      this.preCoti = false;
      this.paypalFunc();
    };
    if (this.inmersiv.tipo === '3') {
      this.inmersiv.mje = 'Solicitar cotización personalizada';
    };
    if (this.inmersiv.tipo === '') {
      console.log('Debe seleccionarse una opcion');
    };
    
  }

  asisst(){
    const pricePistas = this.asisstant.pistas * 3;
    const priceDuration = this.asisstant.tiempo * 5;
    this.asisstant.precio = pricePistas + priceDuration;
    console.log('Precio final ', this.asisstant.precio);
    this.orden.precio = Math.floor(this.asisstant.precio);
    this.orden.descripcion = this.cotizacion.servicio;
    this.cotiCard = true;
    this.preCoti = false;
    this.paypalFunc();
  }

  mm2() {
    console.log('pago de mm2')
  }




  successPay(): void {
    this.dialog.open(SuccesspayComponent);
  }

  wrongPay(): void {
    this.dialog.open(WrongpayComponent);
  }
}
