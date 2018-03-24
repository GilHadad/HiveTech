import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { Comment } from '../interfaces';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {

  @Input() selectedPostId: string;
  @Input() selectedCommentId: string;


  commentCol: AngularFirestoreCollection<Comment>;
  comments: any;

  selectedCommentPath: string;
  commentDoc: AngularFirestoreDocument<Comment>;
  comment: Observable<Comment>;

  lastCommentDate: Date;

  constructor(public auth: AuthService, private afs: AngularFirestore) { }

  ngOnChanges() {

    this.selectedCommentPath = 'posts/' + this.selectedPostId + '/comments/' + this.selectedCommentId;
    this.commentDoc = this.afs.doc(this.selectedCommentPath);
    this.comment = this.commentDoc.valueChanges();

    this.commentCol = this.afs.collection('posts/' + this.selectedPostId + '/comments', ref => ref.orderBy('created'));
    this.comments = this.commentCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });

    this.afs.firestore.doc('/posts/' + this.selectedPostId).get().then(postItem => {
      this.afs.firestore.doc(this.selectedCommentPath).get().then(commentItem => {
        if (postItem.data().lastCommentDate > commentItem.data().created) {
          this.commentDoc.update({ 'editable': false });
        }
      });
    });


  }

  ngOnInit() {


  }
}
