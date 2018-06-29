import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { NoteService } from './note.service';
import { HttpParams } from '@angular/common/http';
import { throwToolbarMixedModesError } from '@angular/material';


@Injectable()
export class UserService {

  constructor(
      private httpserviceObj: HttpService
    ) { }

    getUserByEmail(email) : any {
      let par = new HttpParams().set('text', email).set('index', 'user');
      return this.httpserviceObj.getUserByEs(par);
    }

    addCollaborator(userId , noteId) : any {
      let par = new HttpParams().set('sharedUserId', userId).set('noteId', noteId);
      return this.httpserviceObj.addCollab(par);
    }

    // working on
    getUserById(userId) : any{
       let par = new HttpParams().set('userId', userId); 
       return this.httpserviceObj.getUserById('user/profile',par);
    }
}

