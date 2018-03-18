import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { Post, User } from '../interfaces';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];
  postForm: FormGroup;
  tags = [];

  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    public thisDialogRef: MatDialogRef<AddPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.postForm = fb.group({
      title: [''],
      content: [''],
      tags: [this.tags]
    });
  }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.addPost();
    this.thisDialogRef.close('Confirm');

  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  addPost() {
    const newPost = this.afs.collection('posts').add({
      'id': null,
      'title': this.postForm.get('title').value,
      'content': this.postForm.get('content').value,
      'tags': this.tags,
      'userDisplayName': this.auth.loginUserInfo.displayName,
      'userPhotoURL': this.auth.loginUserInfo.photoURL,
      'userUID': this.auth.loginUserInfo.uid,
      'created': new Date(),
      'updated': null,
      'lastCommentDate': null,
      'cubes': 0,
      'comments': 0,
      'views': 0,
      'active': true,
      'editable': true
    });

    newPost.then(post => {
      const newPostDoc = this.afs.doc('posts/' + post.id);
      newPostDoc.update({ id: post.id });

      this.afs.collection('users').doc(this.auth.loginUserInfo.uid)
        .collection('posts').doc(post.id).set({
          'active': true,
          'deteted': true,
        });

      console.log(post.id);
    });


  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tags: any): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
