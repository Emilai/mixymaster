import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  cards: any;

  constructor(
    private router: Router,
    private cardService: CardsService
  ) {
    this.cardService.getSponsors().then(cards => {
      if (cards != undefined) {
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

  link(url: string | URL | undefined) {
    window.open(url, "_blank");
  }
}
