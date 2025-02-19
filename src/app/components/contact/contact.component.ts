import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MailnotificationService } from 'src/app/services/mailnotification.service';
import { ModalContactComponent } from '../modal-contact/modal-contact.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  constructor(
    private mns: MailnotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(data: any) {
    
    const mail = data.email;
    const user = data.name;
    const message = data.message;

    await this.mns.mailContact(user, mail, message);
    this.dialog.open(ModalContactComponent);
  }
}
