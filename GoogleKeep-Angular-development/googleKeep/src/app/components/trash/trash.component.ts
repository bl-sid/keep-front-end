import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  public res;
  public notes;
  public view;

  wrap: string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;

  trash = { isTrash: 1 };


  constructor(private noteServiceObj: NoteService, private viewServiceObj: ViewService) {
    this.noteServiceObj.fetchNotes()
      .subscribe(res => {
        this.res = res;
        this.notes = this.res.data;
        console.log("Trash Response is", [res]);
      });

    this.viewServiceObj.getView()
      .subscribe(res => {
        this.view = res;
        this.direction = this.view.data;
        this.layout = this.direction + " " + this.wrap;
      });


}

  ngOnInit() {
    this.noteServiceObj.fetchNotes()
      .subscribe(res => {
        this.res = res;
        this.notes = this.res.data;
        console.log("Trash Response is", [res]);
      });
  }

}
