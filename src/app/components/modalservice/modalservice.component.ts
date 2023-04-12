import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CardsService } from 'src/app/services/cards.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-modalservice',
  templateUrl: './modalservice.component.html',
  styleUrls: ['./modalservice.component.css']
})
export class ModalserviceComponent implements OnInit {

  card: any;
  userInfo: any;

  constructor(private cardService: CardsService, private authService: AuthService, private dialog: MatDialog, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.card = this.cardService.serviceInfo;
    (await this.authService.userData())?.subscribe((async userData => {
      const userInfo = userData.data();
      this.userInfo = userInfo;
    }));
    return;
  }

  cotizar() {
      if (this.userInfo) {
      this.router.navigateByUrl('/pay');
      this.dialog.closeAll();
    } else {
      this.loginModal();
    }
  }

  loginModal(): void {
    this.dialog.open(LoginComponent, {
      height: '800px',
      width: '600px',
    });
  }
}
