import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class PreprodService {

  constructor(private firestore: AngularFirestore) { }



  async setPreProductions(id: string | undefined, data: firebase.firestore.DocumentData) {
    try {
      let datos = await this.firestore.collection('usuarios').doc(id).collection('preProductions').doc().set(data);
      console.log('setPreProduccion ejecutado con exito');
      return datos

    } catch (error) {
      console.log(error);
    }
  };

  async setProductions(id: string | undefined, data: firebase.firestore.DocumentData) {
    try {
      let datos = await this.firestore.collection('usuarios').doc(id).collection('productions').doc().set(data);
      console.log('setProduccion ejecutado con exito');
      return datos

    } catch (error) {
      console.log(error);
    }
  };
}
