import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderPipe } from 'ngx-order-pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.css']
})
export class AdminModalComponent implements OnInit {

  userToAdmin: any;
  productions: any = [];

  constructor(
    private cardService: CardsService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<AdminModalComponent>,
    private orderPipe: OrderPipe
  ) {
    console.log(this.productions);
   }

 async ngOnInit(): Promise<void> {
    this.userToAdmin = this.cardService.userToAdmin;
    
    await this.cardService.getProductions(this.userToAdmin.id).then(cards => {
      cards?.subscribe(card => {
        this.productions = card.map(cardRef => {
          const data = cardRef.payload.doc.data();
          return data;
        });
        this.productions = this.orderPipe.transform(this.productions, 'fecha', true);
      });
    });
  }

  async guardarCambios() {
    const path = 'usuarios'
    const data = this.userToAdmin;
    const id = this.userToAdmin.id;
    await this.auth.createUser(data, path, id);
    this.dialogRef.close();
  }
}
