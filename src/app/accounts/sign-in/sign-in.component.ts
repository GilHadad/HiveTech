import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../../core/auth.service';

import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  aboutYou: FormGroup;
  schoolDetails: FormGroup;
  userUid: string;

  constructor(
    public auth: AuthService, private afs: AngularFirestore,
    @Inject(FormBuilder) fb: FormBuilder,
  ) {
    this.aboutYou = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      dateOfBirth: ['', Validators.required],
      facebook: [''],

    });

    this.schoolDetails = fb.group({
      city: ['', Validators.required],
      school: ['', Validators.required],
      class: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userUid = this.auth.loginUserInfo.uid;
    // this.userRef = this.afs.doc(`users/${this.userUid}`);
  }

  submit() {
    const data = {
      uid: this.auth.loginUserInfo.uid,

      userInfo: {
        about_you: this.aboutYou.value,
        school_details: this.schoolDetails.value,


      },
      status: 'pending',
      created: new Date(),


    };
    this.afs.collection('requests').doc('users')
      .collection('activationRequest').doc(this.auth.loginUserInfo.uid + '_' + this.afs.createId()).set(data);
  }

}
