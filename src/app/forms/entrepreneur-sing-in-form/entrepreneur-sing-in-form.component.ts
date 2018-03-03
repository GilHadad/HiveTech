import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsList, Cost, Step } from '../entrepreneur-sing-in-form/interface';

@Component({
  selector: 'app-entrepreneur-sing-in-form',
  templateUrl: './entrepreneur-sing-in-form.component.html',
  styleUrls: ['./entrepreneur-sing-in-form.component.css']
})
export class EntrepreneurSingInFormComponent implements OnInit {

  aboutYou: FormGroup;
  aboutTheIdea: FormGroup;
  development: FormGroup;
  timeLine: FormGroup;
  stepForm: FormGroup;

  platforms: ItemsList[] = [];
  relatedTags: ItemsList[] = [];
  codeLanguages: ItemsList[] = [];



  steps: Step[] = [];
  stepConter: any = 1;

  hardwares: Cost[] = [];
  softwares: Cost[] = [];

  constructor(@Inject(FormBuilder) fb: FormBuilder) {

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

    this.timeLine = fb.group({
      earliestStart: [''],
      steps: [this.steps],
    });

    this.stepForm = fb.group({
      title: new FormControl(),
      description: new FormControl(),
      duration: new FormControl(),
    });
  }

  ngOnInit() { }

  add_new_line(value: string, list: ItemsList[]) {
    const new_value = {
      name: value,
      active: true
    };
    list.push(new_value);
  }

  remove_selected_line(line: ItemsList) {
    line.active = false;

  }

  add_new_cost(name: string, cost: number, cost_list: Cost[]) {
    const new_cost = {
      name: name,
      active: true,
      estimatedCost: cost,
      errorVelidation: [],
    };
    cost_list.push(new_cost);

  }

  add_step() {
    const newStep: Step = {
      number: this.getNextStepNumber(),
      title: this.stepForm.controls.title.value,
      description: this.stepForm.controls.description.value,
      duration: this.stepForm.controls.duration.value,
      active: true,
    };

    this.steps.push(newStep);

  this.stepForm.reset();



  }
  getNextStepNumber(): Number {
    return this.stepConter++;
  }
}
