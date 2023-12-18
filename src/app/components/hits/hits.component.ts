import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hits',
  templateUrl: './hits.component.html',
  styleUrls: ['./hits.component.css']
})
export class HitsComponent implements OnInit {

  hits = 5;
  userInfo: any;

  constructor(
    public authService: AuthService,
    private firestore: AngularFirestore,
    public auth: Auth
  ) { }

  async ngOnInit() {
    try {
      const userInf = await this.firestore.collection('usuarios').doc(this.auth.currentUser?.uid).get().toPromise();
      if (userInf && userInf.exists) {
        this.userInfo = userInf.data()!;
        console.log(this.userInfo);
        this.hits = this.userInfo.hits
      } else {
        console.log(this.userInfo);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
