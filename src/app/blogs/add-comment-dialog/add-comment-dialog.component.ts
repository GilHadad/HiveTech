import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css']
})

export class AddCommentDialogComponent implements OnInit {

  content = new FormControl();
  commentCol: AngularFirestoreCollection<Comment>;
  comments: any;

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



    newComment.then(comment => {
      console.log(comment);
      this.afs.collection('users').doc(this.auth.loginUserInfo.uid)
        .collection('comments').doc(comment.id).set({
          'post': this.data.postId,
          'active': true,
        });

      this.afs.firestore.doc(comment.path).get().then(addedComment => {
        this.afs.firestore.doc('/posts/' + this.data.postId).get().then(selectedPost => {
          this.afs.collection('posts/').doc(this.data.postId).update(
            {
              'comments': selectedPost.data().comments + 1,
              'lastCommentDate': addedComment.data().created
            });
        });

      });

      // // update comment edit status - NOT WORKING !!!
      // this.commentCol = this.afs.collection('posts/' + this.data.postId + '/comments', ref => ref.orderBy('created'));
      // this.comments = this.commentCol.snapshotChanges()
      //   .map(actions => {
      //     return actions.map(a => {
      //       const data = a.payload.doc.data() as Comment;
      //       const id = a.payload.doc.id;
      //       return { id, data };
      //     });
      //   });

      // this.afs.firestore.doc('/posts/' + this.data.postId).get().then(postItem => {
      //   this.afs.firestore.doc(comment.path).get().then(commentItem => {
      //     if (postItem.data().lastCommentDate > commentItem.data().created) {
      //       comment.update({ 'editable': false });
      //     }
      //   });
      // });

    });


  }


}
