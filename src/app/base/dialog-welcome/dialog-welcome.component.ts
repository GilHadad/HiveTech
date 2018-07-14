import { Component, OnInit } from '@angular/core';
import * as images from '../storage-links.json';
import * as strings from '../storage-strings.json';

@Component({
  selector: 'app-dialog-welcome',
  templateUrl: './dialog-welcome.component.html',
  styleUrls: ['./dialog-welcome.component.css', '../home/home.component.css']
})
export class DialogWelcomeComponent implements OnInit {

  imgLinks = (<any>images);
  textString = (<any>strings);

  constructor() { }

  ngOnInit() {
  }

}
