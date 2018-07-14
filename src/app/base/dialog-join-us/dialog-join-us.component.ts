import { Component, OnInit } from '@angular/core';
import * as images from '../storage-links.json';
import * as strings from '../storage-strings.json';
import { AuthService } from '../../core/auth.service';

interface CommunityRoles {
  title: string;
  subTitel: string;
  descripton: string;
  img: string;
  slug: string;
  slugMoreInfo: string;
}

@Component({
  selector: 'app-dialog-join-us',
  templateUrl: './dialog-join-us.component.html',
  styleUrls: ['./dialog-join-us.component.css', '../home/home.component.css']
})
export class DialogJoinUsComponent implements OnInit {

  imgLinks = (<any>images);
  textString = (<any>strings);

  communityRoles: CommunityRoles[];

  constructor(public auth: AuthService) {

    this.communityRoles = [
      {
        title: this.textString.dialogJoinUs_entrepreneur_title,
        subTitel: this.textString.dialogJoinUs_entrepreneur_subTitle,
        descripton: this.textString.dialogJoinUs_entrepreneur_content,
        img: this.imgLinks.entrepreneur,
        slug: this.textString.dialogJoinUs_entrepreneur_slug,
        slugMoreInfo: this.textString.dialogJoinUs_entrepreneur_slug_moreInfo,

      },
      {
        title: this.textString.dialogJoinUs_investor_title,
        subTitel: this.textString.dialogJoinUs_investor_subTitle,
        descripton: this.textString.dialogJoinUs_investor_content,
        img: this.imgLinks.investor,
        slug: this.textString.dialogJoinUs_investor_slug,
        slugMoreInfo: this.textString.dialogJoinUs_investor_slug_moreInfo,
      }
    ];

  }

  ngOnInit() {
  }

}
