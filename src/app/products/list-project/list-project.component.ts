import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

import { MatChipInputEvent } from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

  aboutYou: FormGroup;
  aboutTheIdea: FormGroup;
  development: FormGroup;
  timeLine: FormGroup;
  stepForm: FormGroup;

  separatorKeysCodes = [ENTER, COMMA];

  platforms = [];
  relatedTags = [];

  codeLanguages = [];
  hardwares = [];
  softwares = [];

  constructor(
    public auth: AuthService, private afs: AngularFirestore,
    @Inject(FormBuilder) fb: FormBuilder,
  ) {

    this.aboutYou = fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      address: [''],
      dateOfBirth: [''],
      linkedin: [''],
      facebook: [''],
    });

    this.aboutTheIdea = fb.group({
      title: [''],
      description: [''],
      platforms: [this.platforms],
      related_tags: [this.relatedTags],
    });

    this.development = fb.group({
      codeLanguage: [this.codeLanguages],
      hardware: [this.hardwares],
      software: [this.softwares],
    });

  }

  ngOnInit() {
  }


  add(event: MatChipInputEvent, element: string[]): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      element.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: any, element: string[]): void {
    console.log(item);
    const index = element.indexOf(item);

    if (index >= 0) {
      element.splice(index, 1);
    }
  }

  clearList (list: string[]): void {
    console.log(list);
    for (const el of list) {
      console.log(el);
      this.remove(el, list);
    }
    // console.log(list);
    // list = [];
    // console.log(list);
    // console.log(this.codeLanguages);
  }


  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our fruit
  //   if ((value || '').trim()) {
  //     this.platforms.push(value.trim());
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // remove(platform: any): void {
  //   const index = this.platforms.indexOf(platform);

  //   if (index >= 0) {
  //     this.platforms.splice(index, 1);
  //   }
  // }


}
