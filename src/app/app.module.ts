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

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './accounts/user-profile/user-profile.component';
import { EntrepreneurSingInFormComponent } from './forms/entrepreneur-sing-in-form/entrepreneur-sing-in-form.component';
import { NavbarHeaderComponent } from './base/navbar-header/navbar-header.component';
import { PostsComponent } from './blogs/posts/posts.component';
import { SelectedPostComponent } from './blogs/selected-post/selected-post.component';
import { CommentComponent } from './blogs/comment/comment.component';
import { GeneralDialogComponent } from './base/general-dialog/general-dialog.component';
import { AddPostDialogComponent } from './blogs/add-post-dialog/add-post-dialog.component';
import { AddCommentDialogComponent } from './blogs/add-comment-dialog/add-comment-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    EntrepreneurSingInFormComponent,
    NavbarHeaderComponent,
    PostsComponent,
    SelectedPostComponent,
    CommentComponent,
    GeneralDialogComponent,
    AddPostDialogComponent,
    AddCommentDialogComponent,


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

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPostDialogComponent,
    AddCommentDialogComponent,
  ],
})
export class AppModule { }
