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
    TrashPipe
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],

  providers: [ForgotPassService,
                HttpService,
                  LoginService,
                    NoteService,
                      RegisterService],
  
  bootstrap: [AppComponent],
  entryComponents: [LabelComponent]
})
export class AppModule { }
