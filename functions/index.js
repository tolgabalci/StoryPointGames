const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from StoryPointGames!!!");
});

exports.checkVelocityRange = functions.database.ref('game/{theGameId}').onWrite(event => {
    console.log("Velocity Range Check Baby!!!!!!!!! ", event.data);
});

