const functions = require("firebase-functions");
const { firestore } = require("firebase-admin");
const admin = require("firebase-admin");
admin.initializeApp();

// firebase collection name
const notificationCollection = "mailsPendientes";

// Creating a pubsub function with name `taskRunner`, memory `512MB` and schedule for 1 minute
exports.taskRunner = functions.runWith({ memory: '512MB' }).pubsub.schedule('* * * * *').onRun(async context => {

    // Current Timestamp
    const now = admin.firestore.Timestamp.now()

    // Query all documents ready to perform
    const query = firestore().collection(notificationCollection).where.where('sent', '==', false).where('cancel', '==', false)

    const tasks = await query.get()

    // Jobs to execute
    const jobs = [];

    tasks.forEach(async snapshot => {
        // destruct data from firebase document
        const { usuario } = snapshot.data()


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


        if (job.length != 0) {
            console.log('Notification Sent');
            // updating firestore notification document's `sent` to true. 
            firestore().collection(notificationCollection).doc(snapshot.id).update({ 'sent': true });
        }
        console.log(`Message sent:: ${job}`);

        jobs.push(job)
    })
})
