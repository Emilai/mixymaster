import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  cards: any;
  cardInfo:any;
  productions: any;

  constructor( private firestore: AngularFirestore) { }

  async getCards() {
    // console.log(this.code);
    try {
      const tecnicos = await this.firestore.collection('tecnicos').snapshotChanges();
      this.cards = tecnicos;
      return tecnicos;


    } catch (error) {
      console.log(error);
    }
    return;
  }

  async getProductions(id: string) {
    try {
      const prods = await this.firestore.collection('usuarios').doc(id).collection('productions').snapshotChanges();
      this.productions = prods;
      return prods;


    } catch (error) {
      console.log(error);
    }
  };
}


