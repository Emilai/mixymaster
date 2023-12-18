import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {

  cards: any;

  constructor(
    private router: Router,
    private cardService: CardsService
  ) {
    this.cardService.getTutorials().then(cards => {
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

  video(url: any) {
    window.open(url, "_blank");
  }
}
