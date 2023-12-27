import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailnotificationService {

  constructor() { }

  async mailToUser(usuario: any) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

    const raw = JSON.stringify({
      "personalizations": [
        {
          "to": [
            {
              "email": usuario
            }
          ],
          "dynamic_template_data": {
            "usuario": usuario
          }
        }
      ],
      "from": {
        "email": "hola@mixymaster.com",
        "name": "MixyMaster"
      },
      "reply_to": {
        "email": "hola@mixymaster.com",
        "name": "MixyMaster"
      },
      "template_id": "d-cf317f58de1a422bbc7e9d19f4e84dbb"
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    await fetch("https://api.sendgrid.com/v3/mail/send", requestOptions)
      .then(response => {
        console.log('Mail a Usuario', response);
      })
      .catch(error => console.log('error', error));
  }

}

