import { Component, OnInit ,Input} from '@angular/core';
import { NoteService } from '../../services/note.service';
import { LabelService } from '../../services/label.service';
import { NoteTemplateService } from '../../services/note-template.service';


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

  labels = [];
 //model : 
 public colors: string[][] = [["white", "rgb(255, 138, 128)", "rgb(255, 209, 128)", "rgb(255, 255, 141)"],
  ["rgb(204, 255, 144)", "rgb(167, 255, 235)", "rgb(128, 216, 255)", "rgb(130, 177, 255)"],
  ["rgb(179, 136, 255)", "rgb(248, 187, 208)", "rgb(215, 204, 200)", "rgb(207, 216, 220)"]];
  
  public selectedcolor: string = "white";
  


  constructor(private noteServiceObj: NoteService, private labelService: LabelService,private notetemplateService : NoteTemplateService) { }

  ngOnInit() {
    this.labels = this.labelService.allLabels;

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

  setColor(note,color) {
    console.log("Selected color and noteid:", [color,note]);
    this.selectedcolor = color;
    note.notePreferences.color = color;
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  pinNote(note)
  {

    // if (note.isPin == 1) {
    //   note.isPin = 0;
    // }
    // else {
    //   note.isPin = 1;
    // }
    // //console.log("For  Pin Note response is :", [note]);
    // this.noteServiceObj.updateNoteData(note);
    note.notePreferences.pin = !note.notePreferences.pin;
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  archive(note)
  {
    this.noteServiceObj.updateArchiveStatus(note.notePreferences.notePreId, "ARCHIVE");
    //this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  trash(note)
  {
    this.noteServiceObj.updateTrashStatus(note.note.noteId, "TRASH");
  }

  setToday(note){
    console.log("Today",note.notePreferences.remainder);
    var today = new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    //console.log("note.notePreferences",note.notePreferences);
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  setTomorrow(note){
    console.log("Tomorrow",note);
    var today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  setNextweek(note){
    console.log("Next week",note);
    var today = new Date();
    today.setDate(today.getDate() + 6);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    this.noteServiceObj.updateNotePref(note.notePreferences)
  } 

  pickDateTime(note){
        console.log("note",note);  
        this.noteServiceObj.updateNotePref(note.notePreferences)
        this.form1 =false;
        this.form2 = false;
  }

  OpenUpdateComponent(note){
    console.log("update",note);
    this.noteServiceObj.OpenUpdateComponent(note, this.labelService.allLabels);
    
  }

  checkLabel(note, label){
    var isLabeled = false;
    note.notePreferences.labels.forEach(noteLabel => {
      if(noteLabel.name == label.name){
        isLabeled = true;
      }
    });
    return isLabeled;
  }

  addOrRemoveLabel($event, note, label){
    console.log($event.checked)
    if($event.checked){
      note.notePreferences.labels.push(label);
    } else{
      note.notePreferences.labels.splice(this.note.notePreferences.labels.indexOf(label), 1);
      //note.notePreferences.labels.remove(label);
    }

    this.noteServiceObj.addLabelToNote(label.labelId, note.note.noteId);
  }

  copy(note){
    note.note.noteId = 0;
    note.notePreferences.notePreId = 0;
    this.noteServiceObj.createNotes(note).subscribe(res => {
      console.log(res);
    });
  }


}
export class DatepickerMinMaxExample {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
}