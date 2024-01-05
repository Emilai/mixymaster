import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardsService } from 'src/app/services/cards.service';
import { AdminModalComponent } from '../admin-modal/admin-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  users: any;
  search: any;

  constructor(
    private cardService: CardsService,
    private dialog: MatDialog
  ) {
    this.cardService.getUsers().then(cards => {
      if (cards != undefined) {
        cards.subscribe(card => {
          this.users = card.map(cardRef => {
            const data = cardRef.payload.doc.data();
            return data;
          });
        });
      }

    });
   }

  ngOnInit(): void {
  }

  openUser(data: any) {
    console.log(data);
    this.cardService.userToAdmin = data;
    this.dialog.open(AdminModalComponent);
  }

}
