import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import * as images from '../storage-links.json';
import * as strings from '../storage-strings.json';



interface CommunityRoles {
  title: string;
  subTitel: string;
  descripton: string;
  img: string;
  slug: string;
}

interface Point {
  title: string;
  descripton: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgLinks = (<any>images);
  textString = (<any>strings);

  title: string;
  content: string;
  communityRoles: CommunityRoles[];
  points: Point[];

  pageText: {
    title: { code: 'title', en: 'Welcome to HiveTech', heb: 'ברוכים הבאים לHiveTech' }
  };

  constructor(public auth: AuthService) {

    this.title = 'Welcome to HiveTech';
    this.content = `
    At some point, you may need to break a large string down into smaller chunks, or strings.
    This is the opposite of concatenation which merges or combines strings into one.

    To do this, you use the split function.
    What it does is split or breakup a string and add the data to a string array using a defined separator.

    If no separator is defined when you call upon the function, whitespace will be used by default.
    In simpler terms, the separator is a defined character that will be placed between each variable.
    `;


    this.communityRoles = [
      {
        title: 'Entrepreneur',
        subTitel: 'I have an idea',
        descripton: ' bla bla bla bla bla bla bla bla bla bla bla bla',
        img: this.imgLinks.entrepreneur,
        slug: '/project-registration',
      },
      {
        title: 'Investor',
        subTitel: 'I have money',
        descripton: 'bla bla bla bla bla bla bla bla bla bla bla bla',
        img: this.imgLinks.investor,
        slug: '/i-have-money',
      }
    ];

    this.points = [
      { title: 'title One', descripton: 'bla bla bla bla bla bla bla bla bla bla bla bla' },
      { title: 'title Two', descripton: 'bla bla bla bla bla bla bla bla bla bla bla bla' },
      { title: 'title Three', descripton: 'bla bla bla bla bla bla bla bla bla bla bla bla' },
    ];

  }

  ngOnInit() {
  }

}
