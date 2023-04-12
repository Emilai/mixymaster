import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { 
  }

  ngOnInit(): void {
  }

  async verificacion() {
    await this.authService.emailVerification();
  }
}
