import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/auth.guard';

import { EntrepreneurSingInFormComponent } from '../app/forms/entrepreneur-sing-in-form/entrepreneur-sing-in-form.component';
import { UserProfileComponent } from '../app/accounts/user-profile/user-profile.component';
import { PostsComponent } from './blogs/posts/posts.component';
import { HomeComponent } from './base/home/home.component';
import { ListProjectComponent } from './products/list-project/list-project.component';
import { RegistrationComponent } from './projects/registration/registration.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,

    },
    {
        path: 'project-registration',
        component: RegistrationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'aaa',
        component: EntrepreneurSingInFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bbb',
        component: UserProfileComponent,
    },
    {
        path: 'posts',
        component: PostsComponent,
        canActivate: [AuthGuard]
    },
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard],

})

export class AppRoutingModule { }
