import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogLoadingComponent } from '../base/dialog-loading/dialog-loading.component';
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

  openDialogLoading(): void {
    const dialogRef = this.dialog.open(DialogLoadingComponent, {
      // width: '250px',
      disableClose: true,
      data: {
        checks: [this.auth.user],
        functions: [this.isUserLogedIn]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {}

  ngOnDestroy() {}

  isUserLogedIn(user: Observable<User>) {}

}
