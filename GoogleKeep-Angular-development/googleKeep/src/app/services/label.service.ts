
/**
* @author: SANA SHAIKh
* @since: 6/06/2018
* @description: This is Login service which calls http services
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { NoteService } from './note.service';


@Injectable()
export class LabelService {

    public allLabels = [];

  constructor(
      private httpserviceObj: HttpService,
       private noteservice : NoteService   
    ) { }

    addLabel(label):any{
        return this.httpserviceObj.addLabel('notes/label/save',label); 
    }

    deleteLabel(label):any{
        return this.httpserviceObj.deleteNoteService('notes/label/deletelabel/'+label.labelId);
    }
}
