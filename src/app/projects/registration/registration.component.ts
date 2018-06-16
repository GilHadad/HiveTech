import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Step {
  index: Number;
  title: string;
  description: string;
  duration: number;
}

interface ProjectBaseInfo {
  uid: String;
  created: Date;
  status: String;
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  projectId: string;

  projectListCol: AngularFirestoreCollection<ProjectBaseInfo>;
  projectList: any;


  // aboutYou: FormGroup;
  // schoolDetails: FormGroup;
  aboutTheIdea: FormGroup;
  development: FormGroup;
  timeLine: FormGroup;
  workFlow: FormGroup;
  stepForm: FormGroup;

  separatorKeysCodes = [ENTER, COMMA];

  platforms = [];
  relatedTags = [];

  codeLanguages = [];
  hardwares = [];
  softwares = [];

  steps: Step[] = [];
  stepsRowSplit: Number = 4;
  stepFormStatus: String = 'add';
  stepFormAfter = { index: 0, value: 'No change' };


  // stepUpdateSelection: FormControl = new FormControl('after');

  constructor(
    public auth: AuthService, private afs: AngularFirestore,
    @Inject(FormBuilder) fb: FormBuilder,
  ) {

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

    this.stepForm = fb.group({
      index: [null],
      title: [''],
      description: [''],
      duration: [''],
      location: [-1],
    });

    this.workFlow = fb.group({
      steps: [this.steps]
    });

  }

  ngOnInit() {




    this.projectId = this.afs.createId();
    const projectPath = 'users/' + this.auth.loginUserInfo.uid + '/projects';
    this.projectListCol = this.afs.collection(projectPath);
    this.projectList = this.projectListCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, data };
        });
      });


    // console.log(this.projectList);

    this.projectList.forEach(project => {
      console.log(project);
    });


  }

  submit() {
    console.log('gil hadad');
    const data = {
      uid: this.auth.loginUserInfo.uid,
      aboutTheIdea: this.aboutTheIdea.value,
      development: this.development.value,
      projectSteps: this.steps,
      created: new Date(),


    };
    this.afs.collection('requests').doc('users')
      .collection('projectRequest').doc(this.auth.loginUserInfo.uid + '_' + this.afs.createId()).set(data);
  }

  add(event: MatChipInputEvent, element: string[]): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) { element.push(value.trim()); }
    if (input) { input.value = ''; }
  }

  remove(item: any, element: string[]): void {
    const index = element.indexOf(item);

    if (index >= 0) { element.splice(index, 1); }
  }

  clearList(list: string[]): void {
    list.splice(0, list.length);
  }

  addstep(): void {
    const step = {
      index: this.steps.length + 1,
      title: this.stepForm.get('title').value,
      description: this.stepForm.get('description').value,
      duration: this.stepForm.get('duration').value,
    };

    this.steps.push(step);

    this.stepForm.reset();
    this.stepForm.controls.location.setValue(-1);

  }

  deleteStep(step): void {
    const index = this.steps.indexOf(step);


    if (index >= 0) {
      this.steps.splice(index, 1);
    }

    this.steps.forEach((item, number) => {
      item.index = number + 1;
    });

  }

  selectStep(step): void {
    this.stepFormStatus = 'update';
    this.stepForm.setValue({
      title: step.title,
      description: step.description,
      duration: step.duration,
      location: -1,
      index: step.index,

    });

  }

  updateStep(): void {
    const index = this.stepForm.get('index').value;
    const indexUpdate = this.stepForm.get('location').value;
    const selectedStep = this.steps[index - 1];

    this.steps[index - 1].title = this.stepForm.get('title').value;
    this.steps[index - 1].description = this.stepForm.get('description').value;
    this.steps[index - 1].duration = this.stepForm.get('duration').value;

    if (indexUpdate !== -1) {
      this.steps.splice(index - 1, 1);
      if (indexUpdate < index) {
        this.steps.splice(indexUpdate, 0, selectedStep);
      }

      if (indexUpdate > index) {
        this.steps.splice(indexUpdate - 1, 0, selectedStep);
      }

      this.steps.forEach((item, number) => {
        item.index = number + 1;
      });
    }

    this.stepForm.reset();
    // this.stepForm.setValue({ location: -1 });
    this.stepForm.controls.location.setValue(-1);
    console.log(this.stepForm.value);
    this.stepFormStatus = 'add';
  }

  navInPage(location: string): void {
    window.location.hash = '';
    window.location.hash = location;
    console.log(location);
  }


  saveStep(step: FormGroup): void {
    console.log(step.value);
  }

  createTestSteps(): void {
    let step = {
      index: this.steps.length + 1,
      title: 'aaa',
      description: 'aaa aaa aaa',
      duration: 5,
    };
    this.steps.push(step);

    step = {
      index: this.steps.length + 1,
      title: 'bbb',
      description: 'bbb bbb bbb',
      duration: 10,
    };
    this.steps.push(step);

    step = {
      index: this.steps.length + 1,
      title: 'ccc',
      description: 'ccc ccc ccc',
      duration: 15,
    };
    this.steps.push(step);

    step = {
      index: this.steps.length + 1,
      title: 'ddd',
      description: 'ddd ddd ddd',
      duration: 20,
    };
    this.steps.push(step);

    step = {
      index: this.steps.length + 1,
      title: 'eee',
      description: 'eee eee eee',
      duration: 25,
    };
    this.steps.push(step);

    step = {
      index: this.steps.length + 1,
      title: 'fff',
      description: 'fff fff fff',
      duration: 30,
    };
    this.steps.push(step);

  }
}

