import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { Post, Comment } from '../interfaces';

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

  private cubesFromUser: number;
  private cubeKey: string;

  commentCol: AngularFirestoreCollection<Comment>;
  comments: any;



  dialogResult = '';

  constructor(
    public auth: AuthService, private afs: AngularFirestore,
    @Inject(FormBuilder) fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.cubeKey = this.auth.loginUserInfo.uid + '_' + this.selectedPostId;
    this.CheckCube();

    this.commentCol = this.afs.collection('posts/' + this.selectedPostId + '/comments', ref => ref.orderBy('created'));
    this.comments = this.commentCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;

          return { id, data };
        });
      });
  }



  addCude() {

    this.afs.firestore.doc('/cubes/' + this.cubeKey).get().then(docSnapshot => {
      this.cubesFromUser += 1;
      console.log(this.cubesFromUser);
      this.afs.collection('cubes').doc(this.cubeKey).set({ 'cubes': this.cubesFromUser });

      this.afs.firestore.doc('/posts/' + this.selectedPostId).get().then(item => {
        this.postDoc.update({ cubes: item.data().cubes + 1 });
      });



    });




  }
  removeCube() {

    this.afs.firestore.doc('/cubes/' + this.cubeKey).get().then(docSnapshot => {
      this.cubesFromUser -= 1;
      console.log(this.cubesFromUser);
      this.afs.collection('cubes').doc(this.cubeKey).set({ 'cubes': this.cubesFromUser });

      this.afs.firestore.doc('/posts/' + this.selectedPostId).get().then(item => {
        this.postDoc.update({ cubes: item.data().cubes - 1 });
      });



    });


  }

  CheckCube() {

    this.afs.firestore.doc('/cubes/' + this.cubeKey).get().then(docSnapshot => {
      if (docSnapshot.exists) {
        this.cubesFromUser = docSnapshot.data().cubes;
        console.log(this.cubesFromUser);

      } else {
        this.cubesFromUser = 0;
        this.afs.collection('cubes').doc(this.cubeKey).set({ 'cubes': this.cubesFromUser });
        console.log(this.cubesFromUser);

      }
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
      this.dialogResult = result;
    });
  }

}
