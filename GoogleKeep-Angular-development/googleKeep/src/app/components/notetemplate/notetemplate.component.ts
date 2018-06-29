import { Component, OnInit ,Input} from '@angular/core';
import { NoteService } from '../../services/note.service';


@Component({
  selector: 'app-notetemplate',
  templateUrl: './notetemplate.component.html',
  styleUrls: ['./notetemplate.component.css']
})
export class NotetemplateComponent implements OnInit {

  @Input() note;
  @Input() layout;

  pin: string;
  form1 :boolean;
  form2 :boolean;
  clock = "assets/icons/clock.svg";
  backarrow ="assets/icons/back.svg";
 //model : 
  public colors: string[][] = [["white", "rgb(255, 138, 128)", "rgb(255, 209, 128)", "rgb(255, 255, 141)"],
  ["rgb(204, 255, 144)", "rgb(167, 255, 235)", "rgb(128, 216, 255)", "rgb(130, 177, 255)"],
  ["rgb(179, 136, 255)", "rgb(248, 187, 208)", "rgb(215, 204, 200)", "rgb(207, 216, 220)"]];
  selectedcolor: string = "white";
  


  constructor(private noteServiceObj: NoteService) { }

  ngOnInit() {

    console.log("Note Template Layout :", this.layout);

    if (this.note.isPin) {
      this.pin = "/assets/icons/unpin.svg";

    }
    else
    {
      this.pin = "/assets/icons/pin.svg";
    }


  }
  showform1(){
   this.form1=true;
   this.form2=false; 
  }
  showform2(){
    this.form1=false;
    this.form2=true;
  }
  hideAll(){
    this.form1=false;
    this.form2=false;
  }

  setColor(color,noteid) {
    console.log("Selected color and noteid:", [color,noteid]);
    this.selectedcolor = color;
    this.noteServiceObj.setColor(color,noteid);
  }

  pinNote(note)
  {

    if (note.isPin == 1) {
      note.isPin = 0;
    }
    else {
      note.isPin = 1;
    }
    //console.log("For  Pin Note response is :", [note]);
    this.noteServiceObj.updateNoteData(note);

  }

  archive(note)
  {
    
    // if (note.isArchive == 1) {
    //   note.isArchive = 0;
    // }
    // else {
    //   note.isArchive = 1;
    //   note.isPin = 0;
    // }
    note.notePreferences.status = "ARCHIVE";
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  trash(note)
  {
    if (note.isTrash == 1) {
      note.isTrash = 0;
    }
    else {
      note.isTrash = 1;
      note.isPin = 0;
    }
    this.noteServiceObj.updateNoteData(note);
  }
  openCollab(note){
    this.noteServiceObj.OpenDailogComponent(note);
  }

  setToday(note){
    console.log("Today",note.notePreferences.remainder);
    var today = new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    //console.log("note.notePreferences",note.notePreferences);
    this.noteServiceObj.updateNotePref(note.notePreferences).subscribe(res => {
      console.log("Reminder res", res);
      this.form1 =false;
      this.form2 = false;
    });
  }

  setTomorrow(note){
    console.log("Tomorrow",note.notePreferences.remainder);
    var today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
   
    this.noteServiceObj.updateNotePref(note.notePreferences).subscribe(res => {
      console.log("Reminder res", res);
      this.form1 =false;
      this.form2 = false;
    });
  }

  setNextweek(note){
    console.log("Next week",note.notePreferences.remainder);
    var today = new Date();
    today.setDate(today.getDate() + 6);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    this.noteServiceObj.updateNotePref(note.notePreferences).subscribe(res => {
      console.log("Reminder res", res);
      this.form1 =false;
      this.form2 = false;
    });
  } 

  pickDateTime(note){
        console.log("pick date and time",note.notePreferences.remainder);  

         this.noteServiceObj.updateNotePref(note.notePreferences).subscribe(res => {
            console.log("Reminder res", res);
            this.form1 =false;
            this.form2 = false;
         });
        
         console.log("Reminder res pickDateTime", note);  
  }

  removeReminder(note){
    note.notePreferences.remainder = null;
    this.noteServiceObj.updateNotePref(note.notePreferences).subscribe(res => {
      console.log("Reminder remove res", res);
    });
  }
  OpenUpdateComponent(note){
    console.log("update",note);
    this.noteServiceObj.OpenUpdateComponent(note);
    
  }
}
export class DatepickerMinMaxExample {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
}