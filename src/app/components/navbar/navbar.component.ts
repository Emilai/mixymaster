import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  userInfo: any;

  constructor(private dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private observer: BreakpointObserver) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  async ngOnInit() {

    await this.authService.userData();
    console.log(this.authService.userInfox);

  }

  loginModal(): void {
    this.dialog.open(LoginComponent, {
      height: '800px',
      width: '600px',
    });
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigateByUrl('main', {
      replaceUrl: true
    });
    window.location.reload();
  }

  main() {
    this.router.navigateByUrl('main', {
      replaceUrl: true
    });
  }

  logged() {
    this.router.navigateByUrl('logged', {
      replaceUrl: true
    });
  }

  cloud() {
    window.open(this.authService.userInfox.drop);
  }
}
