import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],

})
export class LabelComponent implements OnInit {

  editlabel: string = "false";

  public label: any;

  alllabels: any = [];

  constructor(private dialogRefObj: MatDialogRef<LabelComponent>, @Inject(MAT_DIALOG_DATA) public labeldata: any) {
    console.log("Data recieved from Home page", [labeldata]);

    this.alllabels = labeldata;
    console.log("All Labels on Component:", this.alllabels);

  }

  ngOnInit() {

  }

  done()
  {
    this.dialogRefObj.close(this.label);

  }

  editLabel()
  {
    console.log("fsfsfs");
    this.editlabel = "true";
  }



}
