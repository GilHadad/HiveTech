import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { Post, Comment, CommentsViewBy } from '../interfaces';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MatDialog } from '@angular/material';
import { AddCommentDialogComponent } from '../add-comment-dialog/add-comment-dialog.component';


@Component({
  selector: 'app-selected-post',
  templateUrl: './selected-post.component.html',
  styleUrls: ['./selected-post.component.css']
})
export class SelectedPostComponent implements OnInit, OnChanges {

  @Input() selectedPostId: string;
  @Input() post: Observable<Post>;
  @Input() postDoc: AngularFirestoreDocument<Post>;


  commentCol: AngularFirestoreCollection<Comment>;
  comments: any;

  viewBy: CommentsViewBy[];

  dialogResult = '';

  constructor(
    public auth: AuthService, private afs: AngularFirestore,
    @Inject(FormBuilder) fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.viewBy = [{title: 'Rank'}, {title: 'Oldest'}];


   }

  ngOnChanges() {
    // console.log('this.selectedPostId');
    // console.log(this.selectedPostId);

    this.commentCol = this.afs.collection('posts/' + this.selectedPostId + '/comments');
    this.comments = this.commentCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;

          return { id, data };
        });
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      width: '600px',
      data: {
        postId: this.selectedPostId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
  }

}
