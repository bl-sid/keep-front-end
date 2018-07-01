import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { ViewService } from '../../services/view.service';
import { NoteTemplateService } from '../../services/note-template.service';
import { cleanSession } from 'selenium-webdriver/safari';
import { LabelService } from '../../services/label.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {

  public note: boolean = true;
  public mainnote: boolean = false;
  model: any;

  labels;

  wrap: string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;
  public res;
  public view;
  public demo;
  pin = { isPin: 1 };
  unpin = { isPin: 0 };

  subLabel: Subscription;

  backarrow = "assets/icons/back.svg";


  public colors: string[][] = [["white", "rgb(255, 138, 128)", "rgb(255, 209, 128)", "rgb(255, 255, 141)"],
  ["rgb(204, 255, 144)", "rgb(167, 255, 235)", "rgb(128, 216, 255)", "rgb(130, 177, 255)"],
  ["rgb(179, 136, 255)", "rgb(248, 187, 208)", "rgb(215, 204, 200)", "rgb(207, 216, 220)"]];
  selectedcolor: string = "white";


  constructor(private noteservice: NoteService, private viewService: ViewService, private labelService: LabelService) {
    this.viewService.getView().subscribe(res => {

      console.log("View Result is ", res);
      this.view = res;
      this.direction = this.view.data;
      console.log("Direction is :", this.direction);

      this.layout = this.direction + " " + this.wrap;
      console.log("Layout is ", this.layout);

    }, err => {
      console.log("Error is ", err);
    });

  }

  ngOnInit() {
    this.clearNote();
    this.labelService.getLabel('notes/label/getlabels').subscribe(res => {
      this.labels = res;
    });
    if (this.noteservice.notes.length == 0) {
      this.noteservice.fetchNotes()
        .subscribe(res => {
          this.res = res;
          this.demo = this.res;
          this.noteservice.notes = res;
        });
    } else {
      this.demo = this.noteservice.notes;
    }
    this.subLabel = this.labelService.labelsEmmiter.subscribe(l => {
      this.labels = l;
      console.log(l);
    })
  }

  fetchNotes() {
    this.noteservice.fetchNotes()
      .subscribe(res => {
        this.res = res;
        this.demo = this.res;
        console.log("notes response is :", this.res);
        this.noteservice.notes = res;
      });

  }

  addOrRemoveLabel($event, label) {
    var added = false;
    this.model.notePreferences.labels.forEach(l => {
      if(label.name == l.name){
        this.model.notePreferences.labels.splice(this.model.notePreferences.labels.indexOf(label), 1);
        added = true;
      }
    });
    if(!added){
      this.model.notePreferences.labels.push(label);
    }
  }

  showNote() {
    this.mainnote = true;
    this.note = false;
  }

  setColor(color) {
    this.selectedcolor = color;
    this.model.notePreferences.color = color;
  }

  hideNote() {
    this.mainnote = false;
    this.note = true;
  }

  AddNote() {
    this.model.note.title = document.getElementById("title").innerHTML;
    this.model.note.body = document.getElementById("description").innerHTML;

    if (!(this.model.note.title == '' && this.model.note.body == '')) {
      this.noteservice.createNotes(this.model)
        .subscribe(res => {
          console.log("res", [res]);
          this.fetchNotes();
          this.mainnote = false;
          this.note = true;
        });
      this.clearNote();
    }
  }

  clearNote() {
    this.model = { 'note': {}, 'notePreferences': {} };
    this.model.notePreferences.status = 'NONE';
    this.model.notePreferences.color = "white";
    this.mainnote = false;
    this.note = true;
    this.selectedcolor = "white";
  }

  setToday() {
    var today = new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    this.model.notePreferences.remainder = today;
  }

  setTomorrow() {

    var today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    this.model.notePreferences.remainder = today;
  }

  setNextweek() {

    var today = new Date();
    today.setDate(today.getDate() + 6);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    this.model.notePreferences.remainder = today;
  }

  pickDateTime() {
    //console.log("note", note);
  }

  archive() {
    if (this.model.notePreferences.status == 'ARCHIVE') {
      this.model.notePreferences.status = 'NONE';
    } else {
      this.model.notePreferences.status = 'ARCHIVE';
    }
  }

  ngOnDestroy() {
    this.subLabel.unsubscribe();
  }

}
