import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdatenoteService } from '../../services/updatenote.service';


@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.css']
})
export class UpdatenoteComponent implements OnInit {

public note; 

  constructor(
    private UpdatenoteService :UpdatenoteService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public MatRef: MatDialogRef<UpdatenoteComponent>
  ) { 
      this.note = data; 
    }

  ngOnInit() {
  
    document.getElementById('update-title').innerHTML =this.note.note.title;
    document.getElementById('update-description').innerHTML = this.note.note.body;
 
  }

  updateNote(){
    this.note.note.title = document.getElementById("update-title").innerHTML;
    this.note.note.body = document.getElementById("update-description").innerHTML;
    
    console.log("des",this.note.note);
    
     this.UpdatenoteService.updateNote(this.note.note).subscribe(res => {
         console.log("Update note res",res);
     });

  }
}
