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
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  userInfo: any;
  userInfox: any;

  constructor(private dialog: MatDialog,
    public authService: AuthService,
    public auth: Auth,
    private router: Router,
    private firestore: AngularFirestore,
    private observer: BreakpointObserver) { 
  
    }

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
    try {
      const userInf = await this.firestore.collection('usuarios').doc(this.auth.currentUser?.uid).get().toPromise();
      if (userInf && userInf.exists) {
        this.userInfo = userInf.data()!;
        console.log(this.userInfo);
      } else {
        console.log(this.userInfo);
      }
    } catch (error) {
      console.log(error);
    }
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

  async servicios(elem: any) {
    await this.router.navigateByUrl('main', {
      replaceUrl: true
    });
    document.querySelector(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async ingenieros(elem: any) {
    await this.router.navigateByUrl('main', {
      replaceUrl: true
    });
    document.querySelector(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async main(elem: any) {
    await this.router.navigateByUrl('main', {
      replaceUrl: true
    });
    document.querySelector(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  async contact(elem: any) {
    await this.router.navigateByUrl('main', {
      replaceUrl: true
    });
    document.querySelector(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  logged() {
    this.router.navigateByUrl('logged', {
      replaceUrl: true
    });
  }
  hits() {
    this.router.navigateByUrl('hits', {
      replaceUrl: true
    });
  }
  tutorials() {
    this.router.navigateByUrl('tutorials', {
      replaceUrl: true
    });
  }

  cloud() {
    window.open(this.authService.userInfox.drop);
  }

  pay() {
    this.router.navigateByUrl('pay', {
      replaceUrl: true
    });
  }

  credits() {
    this.router.navigateByUrl('credits', {
      replaceUrl: true
    });
  }

  faq() {
    this.router.navigateByUrl('faq', {
      replaceUrl: true
    });
  }
  admin() {
    this.router.navigateByUrl('admin', {
      replaceUrl: true
    });
  }

  test() {
    console.log(this.userInfox);
  }

  async testing() {
    await this.authService.emailVerification();
  }
}
