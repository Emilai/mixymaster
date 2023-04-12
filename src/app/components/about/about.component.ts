import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDateFormats } from '@angular/material/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  cards: any;

  constructor(private cardService: CardsService, public dialog: MatDialog) {
    this.cardService.getCards().then(cards => {
      if (cards != undefined ) {
        cards.subscribe(card => {
          this.cards = card.map(cardRef => {
            const data = cardRef.payload.doc.data();
            return data;
          });
        });
      }
      
    });
   }

  ngOnInit(): void {
  }

  
  openModal(card: any){
    this.dialog.open(ModalComponent);
    this.cardService.cardInfo = card;
  }
}
