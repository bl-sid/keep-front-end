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
    
    if (note.isArchive == 1) {
      note.isArchive = 0;
    }
    else {
      note.isArchive = 1;
      note.isPin = 0;
    }
    this.noteServiceObj.updateNoteData(note);
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


}
