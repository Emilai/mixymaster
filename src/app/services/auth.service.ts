import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { MatDialog } from '@angular/material/dialog';
import { RegistererrorComponent } from '../components/registererror/registererror.component';
import { emailVerified } from '@angular/fire/auth-guard'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthData: any;
  userInfo: any;
  userInfox: any;

  // private user: Observable<firebase.User | null>;

  constructor( public auth: Auth,
    private firestore: AngularFirestore,
    private dialog: MatDialog) {


     }

  async register({ email, password }: any) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.userAuthData = user;
      return user;
    } catch (e) {
      console.log('este es el error');
      this.errorRegister();
      return null;
    }
  }

  async login({ email, password }: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.userAuthData = user;

      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  createUser(data: any, path: string, id: string) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  logout() {
    return signOut(this.auth);
  }

  async forgotPass(email: string) {

    try {
      return sendPasswordResetEmail(this.auth, email).then(() => {
        console.log('Password Reset send');
      });
    } catch (err) {
      console.log(err);
    }
  }

  async emailVerification() {
    if (this.auth.currentUser){
      try {
        sendEmailVerification(this.auth.currentUser);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('No hay usuario registrado');
    }
  }

  async userData() {
    try {
      const userInf= await this.firestore.collection('usuarios').doc(this.auth.currentUser?.uid).get();
      this.userInfo = userInf.subscribe((userdata => {
        this.userInfox = userdata.data()
        console.log('esta es la info: ', this.userInfox);
      }));
      return userInf;
    } catch (error) {
      console.log(error);
    }
  };

  errorRegister(): void {
    this.dialog.open(RegistererrorComponent);
  }
}
