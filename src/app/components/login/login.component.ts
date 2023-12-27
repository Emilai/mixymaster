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
  FormBuilder, Validators
} from '@angular/forms';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  Router
} from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { LoginerrorComponent } from '../loginerror/loginerror.component';
import { RegistererrorComponent } from '../registererror/registererror.component';
import { RegistersuccessComponent } from '../registersuccess/registersuccess.component';
import { RegistererrormailComponent } from '../registererrormail/registererrormail.component';
import { RegisterduplicatedmailComponent } from '../registerduplicatedmail/registerduplicatedmail.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  formReg: FormGroup;
  formLog: FormGroup;
  passReset: FormGroup;
  recEmail = '';
  email = '';
  email2 = '';
  password = '';
  password2 = '';
  loading = false;
  checked = false;
  equipoValue = 3;
  platformValue = 3;
  equipoImg = [
    '../../../assets/100monitores.png',
    '../../../assets/70monitores.png',
    '../../../assets/50monitores.png',
    '../../../assets/70phones.png',
    '../../../assets/100phones.png'
  ];

  platformImg = [
    '../../../assets/100pc.png',
    '../../../assets/70pc.png',
    '../../../assets/50mac.png',
    '../../../assets/70mac.png',
    '../../../assets/100mac.png'
  ]

  userInfo = {
    nombre: '',
    apellido: ''
  };

  forgot = false;

  user: any;

  soyList: string[] = ['Músico', 'Productor', 'Técnico', 'Estudiante', 'Miembro AES', 'Otros'];
  redesList: string[] = ['Facebook', 'Instagram', 'LinkedIn', 'tik tok', 'Reddit', 'Discord', 'Otras'];
  platformList: string[] = ['Windows', 'MacOS', 'Linux'];
  dawList: string[] = ['ProTools', 'Nuendo-Cubase', 'Reaper', 'Logic Pro', 'Ableton Live', 'Fl Studio', 'Garage Band', 'Studio Live', 'Otros'];

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private afAuth: AngularFireAuth
  ) {
    this.formReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email2: new FormControl(),
      soy: new FormControl(),
      redes: new FormControl(),
      platform: new FormControl(),
      daw: new FormControl(),
      otherDaws: new FormControl(),
      equipo: new FormControl(),
      conforme: new FormControl(),
    });

    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });

    this.passReset = new FormGroup({
      email: new FormControl()
    });

  }


  ngOnInit() {
    
  }


  submit() {
    this.authService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['']);
      })
      .catch(error => {
        console.log(error);
      })
  }

  async login() {

    const user = await this.authService.login(this.formLog.value);
    if (user) {
      this.router.navigateByUrl('/logged', {
        replaceUrl: true
      });
      this.dialog.closeAll();
    } else {
      this.errorLogin();
    }
  }

  async register() {
    this.loading = true;

    const regData = {
      'email': this.formReg.value.email,
      'password': this.formReg.value.password
    }
    this.email = this.formReg.value.email;
    this.email2 = this.formReg.value.email2;

    if (this.email !== this.email2) {
      this.loading = false;
      this.errorRegisterMail();
    } else {

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
        creditos: 0,
        hits: 0,
        soy: this.formReg.value.soy,
        redes: this.formReg.value.redes,
        platform: this.formReg.value.platform,
        daw: this.formReg.value.daw,
        otherDaws: this.formReg.value.otherDaws,
        equipo: this.formReg.value.equipo,
        conforme: this.formReg.value.conforme,

      };

      const path = 'usuarios';
      const id = this.user.user.uid;

      // console.log(regData);
      if (this.user) {
        await this.authService.createUser(usuario, path, id);
        await this.authService.emailVerification();
        this.router.navigateByUrl('logged', {
          replaceUrl: true
        });
        this.dialog.closeAll();
        this.successRegister();
      } else {
        this.loading = false;
        this.dialog.closeAll();
        this.errorRegister();
      }
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
  
  errorLogin(): void {
    this.dialog.open(LoginerrorComponent);
  }

  errorRegister(): void {
    this.dialog.open(RegistererrorComponent);
  }
  errorRegisterMail(): void {
    this.dialog.open(RegistererrormailComponent);
  }

  successRegister(): void {
    this.dialog.open(RegistersuccessComponent);
  }

  errorRegisterRepeated() {
    this.dialog.open(RegisterduplicatedmailComponent);
  }

  login2() {
  const usuario = {
    id: this.user.user.uid,
    nombre: this.formReg.value.nombre,
    apellido: this.formReg.value.apellido,
    email: this.user.user.email,
    grupos: ['General'],
    wip: false,
    drop: '',
    creditos: 0,
    hits: 0,
    soy: this.formReg.value.soy,
    redes: this.formReg.value.redes,
    platform: this.formReg.value.platform,
    daw: this.formReg.value.daw,
    otherDaws: this.formReg.value.otherDaws,
    equipo: this.formReg.value.equipo,
    conforme: this.formReg.value.conforme,

  };
console.log(usuario);
  }

}
