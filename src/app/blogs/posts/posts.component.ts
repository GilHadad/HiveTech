import { Component, OnInit, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
  title: string;
  content: string;
  userDisplayName: string;
  userUID: string;
  created: Date;
  updated: Date;
  crowns: number;
  comments: number;
  views: number;
  relatedTags: string[];
  active: boolean;

}



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



  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;



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
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });


  }

  addPost() {
    this.afs.collection('posts').add({
      // 'title': this.title,
      // 'content': this.content,
      'title': this.postForm.get('title').value,
      'content': this.postForm.get('content').value,
      'tags': this.tags,
      'userDisplayName': this.auth.loginUserInfo.displayName,
      'userUID': this.auth.loginUserInfo.uid,
      'created': new Date(),
      'updated': new Date(),
      'crowns': 0,
      'comments': 0,
      'views': 0,
      'active': true


    });
  }

  getPost(postId) {
    console.log(postId);
    this.postDoc = this.afs.doc('posts/' + postId);
    this.post = this.postDoc.valueChanges();

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

}
