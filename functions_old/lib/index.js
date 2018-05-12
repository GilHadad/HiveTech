// import * as functions from 'firebase-functions';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
document('users/{userId}/projects/{projectId}')
    .onCreate(event => {
    const userId = event.params.userId;
    const projectId = event.params.projectId;
    const projectData = event.data.data();
    const newProject = {
        'userId': userId,
        'created': projectData.created,
        'status': projectData.status
    };
    return admin.firestore()
        .collection('system_users').doc(userId)
        .collection('projects').doc(projectId)
        .set(newProject, { merge: true });
});
//# sourceMappingURL=index.js.map