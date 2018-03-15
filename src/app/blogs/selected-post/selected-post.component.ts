import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { Post, Comment } from '../interfaces';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-selected-post',
  templateUrl: './selected-post.component.html',
  styleUrls: ['./selected-post.component.css']
})
export class SelectedPostComponent implements OnInit {

  @Input() selectedPostId: string;
  @Input() post: Observable<Post>;
  @Input() postDoc: AngularFirestoreDocument<Post>;


  constructor(
    public auth: AuthService, private afs: AngularFirestore,
    @Inject(FormBuilder) fb: FormBuilder
  ) { }

  ngOnInit() {
    // this.postDoc.snapshotChanges().map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data() as Post;
    //     const id = a.payload.doc.id;

    //     return { id, data };
    //   });
    // });

    console.log(this.selectedPostId);


  }

  addCommentToPost() {
    const path = 'posts/' + this.selectedPostId + '/comments';
    console.log(path);

    this.afs.collection(path).add({
      'content': 'hhhhh',
      'userUID': this.auth.loginUserInfo.uid,
      'created': new Date(),
      'updated': new Date(),
      'editable': true,
      'active': true


    });
  }
}
