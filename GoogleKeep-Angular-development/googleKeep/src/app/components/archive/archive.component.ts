import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  public res;
  public notes;
  public view;
  directioin: string = "row";
  wrap: string = "wrap";
  layout: string = this.directioin + " " + this.wrap;
  archive = { isArchive: 1 };



  constructor(private noteServiceObj: NoteService, private viewServiceObj: ViewService) {

    this.viewServiceObj.getView()
      .subscribe(res =>
      {
        this.view = res;
        this.directioin = this.view.data;
        console.log("Archive View Response", this.view);
        this.layout = this.directioin + " " + this.wrap;
      });


    this.noteServiceObj.fetchNotes()
      .subscribe(res => {
        this.res = res;
        this.notes = this.res.data;

        console.log("Archive Response is", [this.notes]);
      },
      err => {
        console.log("Error is :", [err]);
      }
    );






  }

  ngOnInit() {

    this.noteServiceObj.fetchNotes()
      .subscribe(res => {
        this.res = res;
        this.notes = this.res.data;

        console.log("Archive Response is", [this.notes]);
      },
      err => {
        console.log("Error is :", [err]);
      }
      );

  }




}
