import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdatenoteService } from '../../services/updatenote.service';
import { NoteService } from '../../services/note.service';
import { HttpService } from '../../services/http.service';


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

  constructor(
    private UpdatenoteService: UpdatenoteService,
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public MatRef: MatDialogRef<UpdatenoteComponent>
  ) {
    this.note = data;
    this.selectedcolor = this.note.notePreferences.color;
  }

  ngOnInit() {

    document.getElementById('update-title').innerHTML = this.note.note.title;
    document.getElementById('update-description').innerHTML = this.note.note.body;

  }

  updateNote() {
    this.note.note.title = document.getElementById("update-title").innerHTML;
    this.note.note.body = document.getElementById("update-description").innerHTML;

    console.log("des", this.note.note);

    this.UpdatenoteService.updateNote(this.note.note).subscribe(res => {
      console.log("Update note res", res);
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
    this.updateArchiveStatus(note.notePreferences.notePreId, "ARCHIVE");
    //this.noteServiceObj.updateNotePref(note.notePreferences);
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

  
}
