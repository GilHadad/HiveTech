import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { MatDialog } from '@angular/material';
import { MatChipInputEvent } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Post, User } from '../interfaces';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
// import { Title } from '@angular/platform-browser';


interface PostId extends Post {
  id: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  mode = new FormControl('push');

  postsCol: AngularFirestoreCollection<Post>;
  posts: any;

  postForm: FormGroup;
  title: string;
  content: string;
  tags = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  dialogResult = '';


  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;
  selectedPostId: string;



  constructor(
    public auth: AuthService, private afs: AngularFirestore,
    @Inject(FormBuilder) fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.postForm = fb.group({
      title: [''],
      content: [''],
      tags: [this.tags]
    });
  }


  ngOnInit() {

    this.postsCol = this.afs.collection('posts', ref => ref.orderBy('created', 'desc'));
    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;

          return { id, data };
        });
      });

    // this.createtTestingData();

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
    });



  }

  getPost(postId, views) {
    this.postDoc = this.afs.doc('posts/' + postId);
    this.post = this.postDoc.valueChanges();
    this.selectedPostId = postId;

    const viewid = postId + '_' + this.auth.loginUserInfo.uid;
    const viewContent = {
      'id': viewid,
      'fisrt': new Date(),
      'last': new Date(),
      'count': 1
    };


    this.afs.firestore.doc('/views/' + viewid).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          this.afs.collection('views/').doc(viewid).update(
            {
            'last': new Date(),
            'count': docSnapshot.data().count + 1
          });
        } else {
          this.afs.collection('views/').doc(viewid).set(viewContent);
          this.postDoc.update({ views: views + 1, });
        }
      });






  }

  openAddPostDialog() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
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




  // ==============================================================


  createtTestingData() {

    for (let i = 1; i <= 10; i++) {
      const newPost = this.afs.collection('posts').add({
        // 'title': this.title,
        // 'content': this.content,
        'title': 'title ' + i,
        'content': 'bla bla bla bla',
        'tags': this.tags,
        'userDisplayName': this.auth.loginUserInfo.displayName,
        'userUID': this.auth.loginUserInfo.uid,
        'userPhotoURL': this.auth.loginUserInfo.photoURL,
        'created': new Date(),
        'updated': new Date(),
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
      });

    }

  }

}
