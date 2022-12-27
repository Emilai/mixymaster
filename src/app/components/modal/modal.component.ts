import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { CardsService } from 'src/app/services/cards.service';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Virtual } from 'swiper';
import { SwiperModule } from 'swiper/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Virtual]);
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  card: any;
  selectedIndex = 0;
  selectedVideoIndex = 0;
  indicators = true;
  controls = true;

  constructor( private cardService: CardsService,
    private safePipe: SafePipe, private domSanitizer: DomSanitizer,
    public swiper: SwiperModule) { }

  ngOnInit(): void {
    this.card = this.cardService.cardInfo;

  }

  selectImg(index: number): void {
    this.selectedIndex = index;
  }

  selectVid(index: number): void {
    this.selectedVideoIndex = index;
  }

  onPrevClick(): void {
    if(this.selectedIndex === 0) {
      this.selectedIndex = this.card.imagenes.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.card.imagenes.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  onPrevVideoClick(): void {
    if (this.selectedVideoIndex === 0) {
      this.selectedVideoIndex = this.card.vids.length - 1;
    } else {
      this.selectedVideoIndex--;
    }
  }

  onNextVideoClick(): void {
    if (this.selectedVideoIndex === this.card.vids.length - 1) {
      this.selectedVideoIndex = 0;
    } else {
      this.selectedVideoIndex++;
    }
  }

  // slideNext() {
  //   this.swiper.swiperRef.slideNext(100);
  // }
  // slidePrev() {
  //   this.swiper.swiperRef.slidePrev(100);
  // }
}
