"use strict";
// import * as functions from 'firebase-functions';
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.setNewUser = functions.auth.user().onCreate((user) => {
    const data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        roles: {
            subscriber: false,
            member: false,
            admin: false
        },
        status: 'guest',
        created: new Date()
    };
    return admin.firestore().collection('users').doc(user.uid).set(data, { merge: true });
});
exports.createUserRequest = functions.firestore
    .document('requests/users/activationRequest/{requestsId}')
    .onCreate((snapshot, context) => {
    const requestsId = context.params.requestsId;
    const userId = requestsId.split("_")[0];
    const newUserInfo = snapshot.data();
    let user_data;
    let roles;
    let msg;
    let reqStatus;
    console.log(newUserInfo);
    // for checks
    const valid = true;
    user_data = {
        uid: userId,
        user_info: newUserInfo.userInfo.about_you,
        school: newUserInfo.userInfo.school_details,
    };
    if (valid) {
        roles = {
            subscriber: true,
        };
        msg = {
            uid: userId,
            msg: 'Congratulations, You became a subscriber',
            active: true,
            date: new Date(),
            type: 'INFO'
        };
        reqStatus = 'approved ';
        admin.firestore()
            .collection('users').doc(userId)
            .set({ roles }, { merge: true });
    }
    else {
        msg = {
            uid: userId,
            msg: 'Your basic information is not valid. please contact us by mail for support',
            active: true,
            date: new Date(),
            type: 'ERROR'
        };
        reqStatus = 'denied ';
    }
    ;
    user_data.user_info.uid = userId;
    user_data.school.uid = userId;
    console.log(user_data);
    admin.firestore()
        .collection('requests').doc('users')
        .collection('activationRequest').doc(requestsId)
        .set({ status: reqStatus }, { merge: true });
    admin.firestore()
        .collection('users').doc(userId)
        .collection('sys_messages')
        .add(msg, { merge: true });
    admin.firestore().collection('users').doc(userId)
        .collection('info').doc('school')
        .set(user_data.school, { merge: true });
    return admin.firestore().collection('users').doc(userId)
        .collection('info').doc('basic')
        .set(user_data.user_info, { merge: true });
});
exports.submitProjectRequests = functions.firestore
    .document('requests/users/projectRequest/{requestsId}')
    .onCreate((snapshot, context) => {
    const requestsId = context.params.requestsId;
    const userId = requestsId.split("_")[0];
    const projectId = requestsId.split("_")[1];
    const projectData = snapshot.data();
    let msg;
    let reqStatus;
    let valid = false;
    // for checks
    if (projectData.uid === userId) {
        valid = true;
    }
    if (valid) {
        msg = {
            uid: userId,
            msg: 'Project submited - waiting for approval',
            active: true,
            date: new Date(),
            type: 'INFO'
        };
        reqStatus = 'pennding ';
    }
    else {
        msg = {
            uid: userId,
            msg: 'some error message - will be set in the validation',
            active: true,
            date: new Date(),
            type: 'ERROR'
        };
        reqStatus = 'denied ';
    }
    admin.firestore()
        .collection('users').doc(userId)
        .collection('sys_messages')
        .add(msg, { merge: true });
    return admin.firestore().collection('users').doc(userId)
        .collection('projects').doc(projectId)
        .set(projectData, { merge: true });
});
//# sourceMappingURL=index.js.map