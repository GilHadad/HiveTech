import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { I18nService } from '../i18n.service';



interface Product {
  title: string;
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

  title: string;
  content: string;
  products: Product[];
  points: Point[];

  pageText: {
    title: {code: 'title', en: 'Welcome to HiveTech', heb: 'ברוכים הבאים לHiveTech'}
  };

  constructor(public auth: AuthService, private i18n: I18nService) {

    this.title = 'Welcome to HiveTech';
    this.content = `
    At some point, you may need to break a large string down into smaller chunks, or strings.
    This is the opposite of concatenation which merges or combines strings into one.

    To do this, you use the split function.
    What it does is split or breakup a string and add the data to a string array using a defined separator.

    If no separator is defined when you call upon the function, whitespace will be used by default.
    In simpler terms, the separator is a defined character that will be placed between each variable.
    `;


    this.products = [
      {
        title: 'I have an idea',
        descripton: 'bla bla bla bla bla bla bla bla bla bla bla bla',
        img: 'https://firebasestorage.googleapis.com/v0/b/hivetech-d2098.appspot.com/o/assets%2Fhome%2Fbright-idea.jpg?alt=media&token=0b6f3b6c-e759-4125-82df-f6cbab29ab97',
        slug: '/project-registration',
      },
      {
        title: 'I have money',
        descripton: 'bla bla bla bla bla bla bla bla bla bla bla bla',
        // @ts-ignore
        img: 'https://firebasestorage.googleapis.com/v0/b/hivetech-d2098.appspot.com/o/assets%2Fhome%2Finvest.jpg?alt=media&token=327eb166-c39f-4e63-bc7f-e9998c2664a2',
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
