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


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgLinks = (<any>images);
  textString = (<any>strings);

  communityRoles: CommunityRoles[];

  constructor(public auth: AuthService) {


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

  }

  ngOnInit() {
  }

}
