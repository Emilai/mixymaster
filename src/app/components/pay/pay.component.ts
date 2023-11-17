import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';
import { SuccesspayComponent } from '../successpay/successpay.component';
import { WrongpayComponent } from '../wrongpay/wrongpay.component';
import { PreprodService } from 'src/app/services/preprod.service';
import { ContactComponent } from '../contact/contact.component';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';

declare var paypal:any ;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  precioObsesivo = 0;
  cotizacion = {
    servicio: '',
    precioServicio: 0,
    duracion: 0,
    pistas: 1,
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
      bronces: false,
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

  existsName: any;

  mixym2 = {
    tipo: '',
    precio: 0,
    pistas: 1
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
      bronces: 0,
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
  myDate = new Date();
  fecha: any;

  produccion = {
    nombre: '',
    descripcion: '',
    id: '',
    data: {},
    fecha: '',
    precio: 0,
    estado: '',
    validDate: {},
    archivosUrl: [],
    archivosName: [],
  }

  constructor( private dialog: MatDialog,
    private auth: Auth,
    private router: Router,
    private preprod: PreprodService,
    public datePipe: DatePipe,
    private firestore: AngularFirestore
    ) {
    this.fecha = this.datePipe.transform(this.myDate, 'yyyy/MM/dd, HH:mm')
     }

  ngOnInit(): void {
    if (this.auth.currentUser?.emailVerified) {
      console.log('El usuario ESTA VERIFICADO')
      this.produccion.fecha = this.fecha;

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
    this.cotiCard = false;
    this.preCoti = true;
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
      this.price.servicio = 99;
      if (this.cotizacion.pistas < 25) {
        this.price.pistas = 0;
        console.log('menos de 25 pistas')
      } else {
        const pistasExtra = this.cotizacion.pistas - 24;
        console.log('pistas extra =', pistasExtra);
        this.price.pistas = pistasExtra * 4.25;
        console.log( 'precio de las pistas $', this.price.pistas);
      }
      if (this.cotizacion.duracion < 3.6) {
        this.price.duracion = 0;
        console.log('duracion menor a 3 minutos, sin costo extra');
      } else if (this.cotizacion.duracion > 5) {
        console.log('duracion mayor a 5 minutos, cotizar manualmente');
      } else {
        const duracionExtra = this.cotizacion.duracion - 3;
        console.log('duracion extra = ', duracionExtra);
        this.price.duracion = duracionExtra * 30;
        console.log('precio duracion $', this.price.duracion);
      };
    };

    if (this.cotizacion.servicio === 'gold') {
      this.price.servicio = 180;
      if (this.cotizacion.pistas < 41) {
        this.price.pistas = 0;
        console.log('menos de 40 pistas')
      } else {
        const pistasExtra = this.cotizacion.pistas - 40;
        console.log('pistas extra =', pistasExtra);
        this.price.pistas = pistasExtra * 6.25;
        console.log('precio de las pistas $', this.price.pistas);
      }
      if (this.cotizacion.duracion < 3.6) {
        this.price.duracion = 0;
        console.log('duracion menor a 3 minutos, sin costo extra');
      } else if (this.cotizacion.duracion > 5) {
        console.log('duracion mayor a 5 minutos, cotizar manualmente');
      } else {
        const duracionExtra = this.cotizacion.duracion - 3;
        console.log('duracion extra = ', duracionExtra);
        this.price.duracion = duracionExtra * 35;
        console.log('precio duracion $', this.price.duracion);
      };
    };

    if (this.cotizacion.servicio === 'platinum') {
      this.price.servicio = 250;
      if (this.cotizacion.pistas < 101) {
        this.price.pistas = 0;
        console.log('menos de 100 pistas')
      } else {
        const pistasExtra = this.cotizacion.pistas - 100;
        console.log('pistas extra =', pistasExtra);
        this.price.pistas = pistasExtra * 6.25;
        console.log('precio de las pistas $', this.price.pistas);
      }
      if (this.cotizacion.duracion < 3.6) {
        this.price.duracion = 0;
        console.log('duracion menor a 3 minutos, sin costo extra');
      } else if (this.cotizacion.duracion > 5) {
        console.log('duracion mayor a 5 minutos, cotizar manualmente');
      } else {
        const duracionExtra = this.cotizacion.duracion - 3;
        console.log('duracion extra = ', duracionExtra);
        this.price.duracion = duracionExtra * 40;
        console.log('precio duracion $', this.price.duracion);
      };

    };

    if (this.cotizacion.noVox) {
      this.price.noVox = 10;
    };

    if (this.cotizacion.capella) {
      this.price.capella = 10;
    };

    if (this.cotizacion.noMaster) {
      this.price.noMaster = 50;
    };

    if (this.cotizacion.atmos) {
      this.price.atmos = 250;
    };

    if (this.cotizacion.stemsDetail.drums) {
      this.price.stemsDetail.drums = 10;
    };

    if (this.cotizacion.stemsDetail.perc) {
      this.price.stemsDetail.perc = 10;
    };

    if (this.cotizacion.stemsDetail.guit) {
      this.price.stemsDetail.guit = 10;
    };

    if (this.cotizacion.stemsDetail.bass) {
      this.price.stemsDetail.bass = 10;
    };

    if (this.cotizacion.stemsDetail.keys) {
      this.price.stemsDetail.keys = 10;
    };

    if (this.cotizacion.stemsDetail.bronces) {
      this.price.stemsDetail.bronces = 10;
    };

    if (this.cotizacion.stemsDetail.bkgVoice) {
      this.price.stemsDetail.bkgVoice = 10;
    };

    if (this.cotizacion.stemsDetail.mainVoice) {
      this.price.stemsDetail.mainVoice = 10;
    };

    if (this.cotizacion.stemsDetail.others) {
      this.price.stemsDetail.others = 10;
    };

    this.price.stems =
      this.price.stemsDetail.drums +
      this.price.stemsDetail.perc +
      this.price.stemsDetail.guit +
      this.price.stemsDetail.bass +
      this.price.stemsDetail.keys +
      this.price.stemsDetail.bkgVoice +
      this.price.stemsDetail.bronces +
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
      this.precioObsesivo = this.price.total * 0.5;
      this.price.total = this.price.total *1.5;
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

  async mm2() {
    const prodID = this.produccion.nombre.split(' ').join('-');
    const userId = this.auth.currentUser?.uid;

    await this.firestore.collection('usuarios').doc(userId).collection('productions').doc(prodID).get().subscribe(name => {
      this.existsName = name.data();
      if (this.existsName === undefined) {
        if (this.mixym2.tipo === '1' || this.mixym2.tipo === '2') {
          this.mixym2.precio = 35 * this.mixym2.pistas;
        };
        if (this.mixym2.tipo === '3') {
          this.mixym2.precio = 400;
        };
        if (this.mixym2.tipo === '4') {
          this.mixym2.precio = 300;
        };
        if (this.mixym2.tipo === '5') {
          this.mixym2.precio = 250;
        };
        console.log(this.mixym2.precio);
        this.orden.precio = this.mixym2.precio;
        this.orden.descripcion = this.cotizacion.servicio;
        this.cotiCard = true;
        this.preCoti = false;
        this.paypalFunc();
      } else {
        console.log('Nombre YA EXISTE, debemos avisarle que lo cambie por uno nuevo')
      }
    });

  }
  //   Para Plataformas o CD

  //   35 USD por tema de hasta 5min con 1 revision
  // Cada Revisión extra 10 USD
  //   10 tracks de hasta 5 min - 250 USD, 1 revision por tema.Revisión extra por tema 10 USD
  // Tema más largo, consultar

  // Para Vinilo

  // LP 400
  // 12 EP 300
  // 7 EP 250

  // Idea: Cuenta corriente de Créditos ?



  async successPay(): Promise<void> {
    await this.setProduction();
    this.dialog.open(SuccesspayComponent);
  }

  wrongPay(): void {
    this.dialog.open(WrongpayComponent);
  }

  async setPreProduction() {
    this.cotizacion.servicio = this.cotizacion.servicio.toUpperCase();
    this.produccion.data = this.cotizacion;
    this.produccion.precio = this.orden.precio;
    this.produccion.validDate = await this.addDate(this.myDate, 7);
    this.produccion.estado = 'Cotizado';
    const userId = this.auth.currentUser?.uid
    const prodID = this.produccion.nombre.split(' ').join('-')
    this.produccion.id = prodID;

    await this.preprod.setPreProductions(userId, this.produccion, prodID);
    this.router.navigateByUrl('/logged');
  }

  async setProduction() {
    this.cotizacion.servicio = this.cotizacion.servicio.toUpperCase();
    this.produccion.data = this.cotizacion;
    this.produccion.precio = this.orden.precio;
    this.produccion.estado = 'Preproducción';
    const userId = this.auth.currentUser?.uid

    const prodID = this.produccion.nombre.split(' ').join('-')
    this.produccion.id = prodID;

    await this.preprod.setProductions(userId, this.produccion, prodID);
    this.router.navigateByUrl('/logged');
  }

  cotiPersonalizada() {
    this.dialog.open(ContactComponent);
  }

  addDate(date: string | number | Date, days: number) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      console.log('Fecha resultante: ',result);
      return result;
    }

    probar() {
      this.addDate(this.myDate, 7)
    }

  async checkName(){
    const prodID = this.produccion.nombre.split(' ').join('-');
    const userId = this.auth.currentUser?.uid;

      await this.firestore.collection('usuarios').doc(userId).collection('productions').doc(prodID).get().subscribe(name => {
      this.existsName = name.data();
        console.log('name: ', this.existsName);
    });
  }
}
