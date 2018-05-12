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

// exports.postCreate = functions.firestore
//     .document('posts/{postId}')
//     .onCreate(event => {

//         const postId = event.data.id;
//         const post = event.data.data();
//         const data = {
//             'id': postId,
//             'title': post.title,
//             'content': post.content,
//             'comments': 0,
//             'active': true,
//             'editable': true,
//             'last comment date': null,
//             'created': new Date(),
//             'update': null,
//             'tags': post.tags,
//             'userUID': post.userUID,
//             'userDisplayName': post.userDisplayName,
//             'userPhotoURL': post.userPhotoURL,
//             'views': 0,
//             'cubes': 0,
//         }
//         admin.firestore().collection('system_users').doc(post.userUID).collection('posts').doc(postId)
//             .set({ active: true }, { merge: true });

//         return admin.firestore().collection('system_posts').doc(postId).set(data, { merge: true });
//     });

// exports.commentCreate = functions.firestore
//     .document('posts/{postId}/comments/{commentsId}')
//     .onCreate(event => {
//         const postId = event.params.postId;
//         const commentsId = event.params.commentsId;
//         const comment = event.data.data()

//         const data = {
//             'content': comment.content,
//             'subTo': null,
//             'userUID': comment.userUID,
//             'userPhotoURL': comment.userPhotoURL,
//             'userDisplayName': comment.userDisplayName,
//             'created': new Date(),
//             'updated': null,
//             'editable': true,
//             'active': true
//         };

//         admin.firestore().collection('system_users').doc(comment.userUID).collection('comments').doc(commentsId)
//             .set({ active: true }, { merge: true });

//         return admin.firestore().collection('system_posts').doc(postId).collection('comments').doc(commentsId).set(data, { merge: true });
//     });


// exports.viewCreate = functions.firestore
//     .document('views/{viewId}')
//     .onCreate(event => {
//         const viewId = event.params.viewId;
//         const postId = viewId.split("_")[0];
//         const userId = viewId.split("_")[1];

//         const view = event.data.data()


//         const data = {
//             'count': 0,
//             'created': view.created,
//             'updated': view.updated,
//         };

//         return admin.firestore().collection('system_views').doc(viewId).set(data, { merge: true });
//     });

// exports.viewUpdate = functions.firestore
//     .document('views/{viewId}')
//     .onUpdate(event => {
//         const viewId = event.params.viewId;
//         const postId = viewId.split("_")[0];
//         const userId = viewId.split("_")[1];

//         const view = event.data.data()
//         const data = {
//             'updated': view.updated,
//         };

//         return admin.firestore().collection('system_views').doc(viewId).update(data, { merge: true });
//     });

// exports.systemViewUpdate = functions.firestore
//     .document('system_views/{viewId}')
//     .onUpdate(event => {
//         const viewId = event.params.viewId;
//         const postId = viewId.split("_")[0];
//         const userId = viewId.split("_")[1];

//         const view = event.data.data()
//         console.log(view)
//         const newCount = view.count + 1
//         console.log(newCount)

//         const data = {
//             'count': newCount,

//         };

//         return admin.firestore().collection('system_views').doc(viewId).update(data, { merge: true });
//     });


// exports.userCreate = functions.auth
//     .user().onCreate((event) => {
//         const user = event.data; // The Firebase user.

//         // const email = user.email; // The email of the user.
//         // const displayName = user.displayName; // The display name of the user.

//         const data = {
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName,
//             roles: {
//                 subscriber: true
//             }
//         }
//         return admin.firestore().collection('system_users').doc(user.uid).set(data, { merge: true });
//     });

// exports.projectCreate = functions.firestore
    .document('users/{userId}/projects/{projectId}')
    .onCreate(event => {
        const userId = event.params.userId
        const projectId = event.params.projectId
        const projectData = event.data.data()

        const newProject = {
            'userId': userId,
            'created': projectData.created,
            'status': projectData.status
        }

        return admin.firestore()
            .collection('system_users').doc(userId)
            .collection('projects').doc(projectId)
            .set(newProject, { merge: true });
    })