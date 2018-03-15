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

    this.afs.collection(path).add({
      'content': this.content.value,
      'subTo': null,
      'userUID': this.auth.loginUserInfo.uid,
      'created': new Date(),
      'updated': new Date(),
      'editable': true,
      'active': true
    });
  }


}
