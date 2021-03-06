import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';

import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from './core/core.module';
import { HomeComponent } from './base/home/home.component';
import { UserProfileComponent } from './accounts/user-profile/user-profile.component';
import { EntrepreneurSingInFormComponent } from './forms/entrepreneur-sing-in-form/entrepreneur-sing-in-form.component';
import { NavbarHeaderComponent } from './base/navbar-header/navbar-header.component';
import { PostsComponent } from './blogs/posts/posts.component';
import { SelectedPostComponent } from './blogs/selected-post/selected-post.component';
import { CommentComponent } from './blogs/comment/comment.component';
import { AddPostDialogComponent } from './blogs/add-post-dialog/add-post-dialog.component';
import { AddCommentDialogComponent } from './blogs/add-comment-dialog/add-comment-dialog.component';
import { ListProjectComponent } from './products/list-project/list-project.component';
import { RegistrationComponent } from './projects/registration/registration.component';
import { SignInComponent } from './accounts/sign-in/sign-in.component';
import { TestingComponent } from './testing/testing.component';
import { DialogWelcomeComponent } from './base/dialog-welcome/dialog-welcome.component';
import { DialogJoinUsComponent } from './base/dialog-join-us/dialog-join-us.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
    EntrepreneurSingInFormComponent,
    NavbarHeaderComponent,
    PostsComponent,
    SelectedPostComponent,
    CommentComponent,
    AddPostDialogComponent,
    AddCommentDialogComponent,
    ListProjectComponent,
    RegistrationComponent,
    SignInComponent,
    TestingComponent,
    DialogWelcomeComponent,
    DialogJoinUsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,

    FormsModule,
    ReactiveFormsModule,

    Angular2FontawesomeModule,
    NgbModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSelectModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatChipsModule,
    MatSidenavModule,
    MatRadioModule,
    MatTabsModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPostDialogComponent,
    AddCommentDialogComponent,
  ],
})
export class AppModule { }
