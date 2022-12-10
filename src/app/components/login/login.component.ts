import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatTabsModule
} from '@angular/material/tabs';
import {
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  Router
} from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formReg: FormGroup;
  formLog: FormGroup;
  passReset: FormGroup;
  recEmail = '';

  userInfo = {
    nombre: '',
    apellido: ''
  };

  forgot = false;

  user: any;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
    });

    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });

    this.passReset = new FormGroup({
      email: new FormControl()
    });
  }


  ngOnInit() {}


  submit() {
    this.authService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['']);
      })
      .catch(error => console.log(error));
  }

  async login() {

    const user = await this.authService.login(this.formLog.value);
    if (user) {
      this.router.navigateByUrl('/logged', {
        replaceUrl: true
      });
      this.dialog.closeAll();
    } else {
      console.log('Error');
    }
  }

  async register() {

    const regData = {
      'email': this.formReg.value.email,
      'password': this.formReg.value.password
    }

    const user = await this.authService.register(regData);
    this.user = user;


    const usuario = {
      id: this.user.user.uid,
      nombre: this.formReg.value.nombre,
      apellido: this.formReg.value.apellido,
      email: this.user.user.email,
      grupos: ['General'],
      wip: false,
      drop: '',
    };

    const path = 'usuarios';
    const id = this.user.user.uid;

// console.log(regData);
    await this.authService.createUser(usuario, path, id);

    if (this.user) {
      this.router.navigateByUrl('logged', {
        replaceUrl: true
      });
      this.dialog.closeAll();
      alert('Cuenta creada con exito');
    } else {
      alert('Registro fallido');
    }
  }

  forgotChange() {
    this.forgot = !this.forgot
  }

  async resetPass() {
    await this.authService.forgotPass(this.recEmail);
    await this.dialog.closeAll();
    alert('Se ha enviado un mail al correo ingresado');
  }
  
}
