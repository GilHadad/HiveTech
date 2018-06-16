import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { DialogLoadingComponent } from '../dialog-loading/dialog-loading.component';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {
public brand = 'HiveTech';
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
