import { AppComponent } from './app.component';
import { AppRoutingModule }from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPassService } from './services/forgotpass.service';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { LoginService } from './services/login.service';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { NoteService } from './services/note.service';
import { RouterModule } from '@angular/router';
import { RegisterService } from './services/register.service';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { NoteComponent } from './components/note/note.component';
import { LabelComponent } from './components/label/label.component';
import { NotetemplateComponent } from './components/notetemplate/notetemplate.component';
import { FilterPipe } from './pipes/filtter.pipe';
import { ArchiveComponent } from './components/archive/archive.component';
import { ArchivePipe } from './pipes/archive.pipe';
import { TrashComponent } from './components/trash/trash.component';
import { TrashPipe } from './pipes/trash.pipe';
import {OwlDateTimeModule , OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { UpdatenoteComponent } from './components/updatenote/updatenote.component'; 
import { UpdatenoteService } from './services/updatenote.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LabelService } from './services/label.service';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    NoteComponent,
    LabelComponent,
    NotetemplateComponent,
    FilterPipe,
    ArchiveComponent,
    ArchivePipe,
    TrashComponent,
    TrashPipe,
    UpdatenoteComponent,
    CollaboratorComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],

  providers: [ForgotPassService,
                HttpService,
                  LoginService,
                    NoteService,
                    UserService,
                    LabelService,
                      RegisterService,
                      UpdatenoteService,
                    {provide:MAT_DIALOG_DATA,useValue:{}}],
  
  bootstrap: [AppComponent],
  entryComponents: [LabelComponent,UpdatenoteComponent,CollaboratorComponent],
  
})
export class AppModule { }
