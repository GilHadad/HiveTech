import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.auth.user.pipe(
      take(1),
      map((user) => {
        if (user.roles.subscriber) {
          console.log('Active');
          return true;
        } else {
          // console.log('NOT Active');
          // console.log(user.status);
          return false;
        }
      }),
      tap((isActive) => {
        if (!isActive) {
          console.log('access denied');

          this.router.navigate(['/sign-in']);
        }

      }),
    );
  }
}
