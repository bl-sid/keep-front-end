import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdatenoteService } from '../../services/updatenote.service';
import { NoteService } from '../../services/note.service';
import { HttpService } from '../../services/http.service';
import { LabelService } from '../../services/label.service';


@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.css']
})
export class UpdatenoteComponent implements OnInit {

  public note;
  public colors: string[][] = [["white", "rgb(255, 138, 128)", "rgb(255, 209, 128)", "rgb(255, 255, 141)"],
  ["rgb(204, 255, 144)", "rgb(167, 255, 235)", "rgb(128, 216, 255)", "rgb(130, 177, 255)"],
  ["rgb(179, 136, 255)", "rgb(248, 187, 208)", "rgb(215, 204, 200)", "rgb(207, 216, 220)"]];

  public selectedcolor: string = "white";


  form1: boolean;
  form2: boolean;

  archived: String;

  labels = [];

  constructor(
    private UpdatenoteService: UpdatenoteService,
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public MatRef: MatDialogRef<UpdatenoteComponent>
  ) {
    this.note = data.note;
    this.labels = data.labels;
    console.log(this.note)
    console.log('labels: ', this.labels)
    this.selectedcolor = this.note.notePreferences.color;
  }

  ngOnInit() {

    document.getElementById('update-title').innerHTML = this.note.note.title;
    document.getElementById('update-description').innerHTML = this.note.note.body;

    if(this.note.notePreferences.status == 'ARCHIVE') {
      this.archived = 'unarchive';
    } else {
      this.archived = 'archive';
    }

  }

  updateNote() {
    this.note.note.title = document.getElementById("update-title").innerHTML;
    this.note.note.body = document.getElementById("update-description").innerHTML;

    console.log("des", this.note.note);

    this.UpdatenoteService.updateNote(this.note.note).subscribe(res => {
      console.log("Update note res", res);
    });

    this.MatRef.close();

  }

  copy(note){
    note.note.noteId = 0;
    note.notePreferences.notePreId = 0;
    this.createNotes(note).subscribe(res => {
      console.log(res);
    });
  }

  showform1() {
    this.form1 = true;
    this.form2 = false;
  }
  showform2() {
    this.form1 = false;
    this.form2 = true;
  }

  setColor(note, color) {
    console.log("Selected color and noteid:", [color, note]);
    this.selectedcolor = color;
    note.notePreferences.color = color;
    this.updateNotePref(note.notePreferences);
  }

  archive(note)
  {
    if(note.notePreferences.status=="ARCHIVE"){
      note.notePreferences.status="NONE";
      this.archived = 'archive';
      this.updateArchiveStatus(note.notePreferences.notePreId, "NONE");
    } else {
      note.notePreferences.status="ARCHIVE";
      this.archived = 'unarchive';
      this.updateArchiveStatus(note.notePreferences.notePreId, "ARCHIVE");
    }
  }

  trash(note){
    this.updateTrashStatus(note.note.noteId, "TRASH");
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

    this.addLabelToNote(label.labelId, note.note.noteId);
  }


  updateNotePref(notePreferences) {
    this.httpService.putService('notes/updatenotepref', notePreferences).subscribe(res => {
      console.log(res);
    });
  }

  updateArchiveStatus(prefId, status){
    this.httpService.putServiceArchives('notes/archiveorunarchive', prefId, status).subscribe(res => {
      console.log(res);
    });
  }

  updateTrashStatus(noteId, status){
    this.httpService.putServiceTrash('notes/trashorrestore', noteId, status).subscribe(res => {
      console.log(res);
    });
  }

  addLabelToNote(labelId, noteId){
    this.httpService.addOrRemoveLabel('notes/label/addorremovelabelfromnote', noteId, labelId).subscribe(res => {
      console.log(res);
    });
  }

  createNotes(note) :Observable<any>{
    return this.httpService.postService("notes/save", note);
  }

  
}
