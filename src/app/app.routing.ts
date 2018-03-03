import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/auth.guard';

import { EntrepreneurSingInFormComponent } from '../app/forms/entrepreneur-sing-in-form/entrepreneur-sing-in-form.component';
import { UserProfileComponent } from '../app/accounts/user-profile/user-profile.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    // {
    //     path: 'home',
    //     component: HomeComponent,
    //     /** canActivate: [LoginGuard] */
    // },
    {
        path: 'aaa',
        component: EntrepreneurSingInFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bbb',
        component: UserProfileComponent,
    },
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard],

})

export class AppRoutingModule { }
