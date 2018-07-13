import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/auth.guard';
import { UserGuard } from '../app/core/user.guard';


import { EntrepreneurSingInFormComponent } from '../app/forms/entrepreneur-sing-in-form/entrepreneur-sing-in-form.component';
import { UserProfileComponent } from '../app/accounts/user-profile/user-profile.component';
import { PostsComponent } from './blogs/posts/posts.component';
import { HomeComponent } from './base/home/home.component';
import { ListProjectComponent } from './products/list-project/list-project.component';
import { RegistrationComponent } from './projects/registration/registration.component';
import { SignInComponent } from './accounts/sign-in/sign-in.component';
import { TestingComponent } from './testing/testing.component';

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
        canActivate: [UserGuard]
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'testing',
        component: TestingComponent,
    },
    // {
    //     path: 'bbb',
    //     component: UserProfileComponent,
    // },
    {
        path: 'posts',
        component: PostsComponent,
        canActivate: [AuthGuard]
    },
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard, UserGuard],

})

export class AppRoutingModule { }
