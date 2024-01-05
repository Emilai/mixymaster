import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  terminos: any;

  constructor(
    private cardService: CardsService
  ) {
    this.cardService.getTerms().then(cards => {
      if (cards != undefined) {
        cards.subscribe(card => {
          this.terminos = card.map(cardRef => {
            const data = cardRef.payload.doc.data();
            return data;
          });
        });
      }

    });
   }

  ngOnInit(): void {
  }

}
