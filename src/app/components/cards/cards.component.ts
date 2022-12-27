import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  userInfo: any;

  constructor(public authService: AuthService, private dialog: MatDialog,
    private router: Router) { }

  async ngOnInit() {
    (await this.authService.userData())?.subscribe((async userData => {
      const userInfo = userData.data();
      this.userInfo = userInfo;
    }));
    return;
  }

  service() {

    if (this.userInfo) {
      this.router.navigateByUrl('/pay');
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
