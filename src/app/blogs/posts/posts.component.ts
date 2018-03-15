import { Component, OnInit, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Post, User } from '../interfaces';
import { Title } from '@angular/platform-browser';


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

  usersCol: AngularFirestoreCollection<User>;
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



  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;
  selectedPostId: string;



  constructor(
    public auth: AuthService, private afs: AngularFirestore,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.postForm = fb.group({
      title: [''],
      content: [''],
      tags: [this.tags]
    });
  }


  ngOnInit() {



    // this.createtTestingData();

    this.usersCol = this.afs.collection('users');
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          let userInfo;

          this.usersCol.snapshotChanges().forEach(el => {
            el.forEach(user => {
              const uInfo = user.payload.doc.data() as User;
              const uId = user.payload.doc.id;

              if (data.userUID === uId) {
                userInfo = uInfo;
                console.log(userInfo);
              }

            });
          });
          console.log(userInfo);



          return { id, data, userInfo };
        });
      });

    // this.posts.forEach(element => {
    //   console.log(element);
    // });

    // this.usersCol.snapshotChanges().forEach(el => {
    //   el.forEach(user => {
    //     const userInfo = user.payload.doc.data() as User;
    //     const userId = user.payload.doc.id;
    //     console.log(userInfo);
    //   });
    // });


  }

  addPost() {
    this.afs.collection('posts').add({
      'title': this.postForm.get('title').value,
      'content': this.postForm.get('content').value,
      'tags': this.tags,
      'userDisplayName': this.auth.loginUserInfo.displayName,
      'userUID': this.auth.loginUserInfo.uid,
      'created': new Date(),
      'updated': new Date(),
      'lastCommentDate': null,
      'crowns': 0,
      'comments': 0,
      'views': 0,
      'active': true,
      'editable': true
    });



  }

  getPost(postId) {
    this.postDoc = this.afs.doc('posts/' + postId);
    this.post = this.postDoc.valueChanges();
    this.selectedPostId = postId;
    console.log(this.selectedPostId);


    // const path = 'posts/' + this.post.id + '/comments';
    // console.log(this.post.payload.doc.id);
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
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
      this.afs.collection('posts').add({
        // 'title': this.title,
        // 'content': this.content,
        'title': 'title ' + i,
        'content': 'bla bla bla bla',
        'tags': this.tags,
        'userDisplayName': this.auth.loginUserInfo.displayName,
        'userUID': this.auth.loginUserInfo.uid,
        'created': new Date(),
        'updated': new Date(),
        'lastCommentDate': null,
        'crowns': 0,
        'comments': 0,
        'views': 0,
        'active': true,
        'editable': true
      });

    }

  }

}
