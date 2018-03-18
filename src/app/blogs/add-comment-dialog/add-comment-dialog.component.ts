import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css']
})
export class AddCommentDialogComponent implements OnInit {

  content = new FormControl();

  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    public thisDialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.addCommentToPost();
    this.thisDialogRef.close('Confirm');

  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  addCommentToPost() {
    const path = 'posts/' + this.data.postId + '/comments';

    const newComment = this.afs.collection(path).add({
      'content': this.content.value,
      'subTo': null,
      'userUID': this.auth.loginUserInfo.uid,
      'userPhotoURL': this.auth.loginUserInfo.photoURL,
      'userDisplayName': this.auth.loginUserInfo.displayName,
      'created': new Date(),
      'updated': null,
      'editable': true,
      'active': true
    });

    console.log(newComment);

    newComment.then(comment => {
      console.log(comment);
      this.afs.collection('users').doc(this.auth.loginUserInfo.uid)
        .collection('comments').doc(comment.id).set({
          'post': this.data.postId,
          'active': true,
          'deteted': true,
        });

    });

    this.afs.firestore.doc('/posts/' + this.data.postId).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          this.afs.collection('posts/').doc(this.data.postId).update(
            {
              'comments': docSnapshot.data().comments + 1
            });

        }

      });
  }


}
