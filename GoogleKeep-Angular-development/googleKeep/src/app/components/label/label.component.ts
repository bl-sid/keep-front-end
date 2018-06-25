import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],

})
export class LabelComponent implements OnInit {


  public label: any;


  constructor(private dialogRefObj: MatDialogRef<LabelComponent>, @Inject(MAT_DIALOG_DATA) public labeldata: any) {
    console.log("Data recieved from Home page", [labeldata]);
  }

  ngOnInit() {

  }

  done()
  {
    this.dialogRefObj.close(this.label);

  }





}
