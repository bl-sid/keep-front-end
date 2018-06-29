import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { ViewService } from '../../services/view.service';
import { NoteTemplateService } from '../../services/note-template.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  public note: boolean = true;
  public mainnote: boolean = false;
  model: any = {};

  wrap:string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;
  public res;
  public view;
  public demo;
  pin = { isPin: 1 };
  unpin = { isPin: 0 };


  public colors:string[][] = [["white", "rgb(255, 138, 128)", "rgb(255, 209, 128)", "rgb(255, 255, 141)"],
    ["rgb(204, 255, 144)", "rgb(167, 255, 235)", "rgb(128, 216, 255)", "rgb(130, 177, 255)"],
    ["rgb(179, 136, 255)", "rgb(248, 187, 208)", "rgb(215, 204, 200)", "rgb(207, 216, 220)"]];
  selectedcolor: string = "white";


  constructor(private noteservice: NoteService, private viewService: ViewService) {
    this.viewService.getView().subscribe(res => {
      
      console.log("View Result is ", res);
      this.view = res;
      this.direction = this.view.data;
      console.log("Direction is :", this.direction);
      
      this.layout = this.direction + " " + this.wrap;
      console.log("Layout is ", this.layout);

    }, err =>
    {
      console.log("Error is ", err);
      })
    //this.noteservice.fetchNotes()
    //  .subscribe(res => {
    //    this.res = res;
    //    this.demo = this.res;
    //    console.log("notes response is :", this.res[0].note);
    //  });

    //this.fetchNotes();

  }

  ngOnInit() {
    this.noteservice.fetchNotes()
      .subscribe(res =>
      {
        console.log("Notes Response is :",res);
      });
      this.fetchNotes();
  }

  fetchNotes()
  {
    this.noteservice.fetchNotes()
    .subscribe(res => {
      this.res = res;
      this.demo = this.res;
      console.log("notes response is :", this.res[0].note);
    });

  }

  showNote()
  {
    this.mainnote = true;
    this.note = false;
  }

  setColor(color) {
    console.log("Selected color:", color);
    this.selectedcolor = color;

  }

  hideNote()
  {
    this.mainnote = false;
    this.note = true;
  }

  AddNote()
  {
    var title = document.getElementById("title").innerHTML;
    var description = document.getElementById("description").innerHTML;
    this.model.note = {};
    this.model.note.title = title;
    this.model.note.body = description;
    this.model.notePreferences = {}
    this.model.notePreferences.color = this.selectedcolor;

    this.noteservice.createNotes(this.model)
      .subscribe(res => {
        console.log("res", [res]);
        this.fetchNotes();
        this.mainnote = false;
        this.note = true;
      });

    console.log("Values:", [title, description]);
    console.log("Model values are:", [this.model]);
  }

  
}
