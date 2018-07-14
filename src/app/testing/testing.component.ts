import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService, User } from '../core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit, OnDestroy {

  constructor(public auth: AuthService, private afs: AngularFirestore, public dialog: MatDialog) { }


  ngOnInit() {}

  ngOnDestroy() {}

}
