import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreprodService } from '../../services/preprod.service';
import { Auth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modalproduction',
  templateUrl: './modalproduction.component.html',
  styleUrls: ['./modalproduction.component.css']
})
export class ModalproductionComponent implements OnInit {

  production: any;
  archivos: any;
  wavInfo = 'Los archivos deben ser únicamente wav. De 16, 24 o 32 bits. De 44.1khz, 48 KHz, 88,2 KHz o 96 KHz.';
  loading = false;
  userInfo: any;


  constructor(
    private cardService: CardsService,
    private fireStorage: AngularFireStorage,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private preprod: PreprodService,
    private auth: Auth,
    public dialogRef: MatDialogRef<ModalproductionComponent>
  ) { }

  async ngOnInit(): Promise<void> {

    (await this.authService.userData())?.subscribe((async userData => {
      const userInfo = userData.data();
      this.userInfo = userInfo;
      console.log('Usuario: ',this.userInfo);
    }));

    this.production = this.cardService.production;
    console.log('Production: ',this.production);

  }

  closeDialog() {
    this.dialogRef.close();
  }

  async onFileChange(event: any) {
    const files = event.target.files;

    const path1 = this.auth.currentUser?.uid;
    const path2 = this.production.id;

    if (files) {
      const docsUrlArray = [];
      const docsNameArray = [];

      this.loading = true;

      console.log(files);

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < files.length; i++) {

        const path = `${path1}/${path2}/${files[i].name}`;
        const uploadTask = await this.fireStorage.upload(path, files[i]);
        const url = await uploadTask.ref.getDownloadURL();
        const names = files[i].name;
        docsUrlArray.push(url);
        docsNameArray.push(names);
      }

      this.archivos = docsUrlArray;
      this.production.archivosName = docsNameArray;
      this.production.archivosUrl = this.archivos;
      console.log(this.production);
      
      this.loading = false;

    }
  }

  async updateProduction() {
    this.loading = true;
    this.production.estado = 'Esperando Revisión';
    const userId = this.auth.currentUser?.uid
    await this.preprod.setProductions(userId, this.production, this.production.id);
    this.loading = false;
    this.closeDialog();
    alert('Los cambios en su producción se guardaron correctamente');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  carpeta(ref: any) {
    window.open(ref, "_blank");
  }
}
