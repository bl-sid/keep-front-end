import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LabelService } from '../../services/label.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],

})
export class LabelComponent implements OnInit {

  editlabel: string = "false";
 
  public label: any = {};

  alllabels: any = [];

  constructor(
      private LabelService : LabelService,
      private dialogRefObj: MatDialogRef<LabelComponent>,@Inject(MAT_DIALOG_DATA) public labeldata:any ){
        console.log("Data recieved from Home page", [labeldata]);
          this.alllabels = labeldata;
        console.log("All Labels on Component:", this.alllabels);
     }

  ngOnInit() {
  }

  done()
  {
    this.dialogRefObj.close(this.label);
    console.log("labe req",this.label)
    this.LabelService.addLabel(this.label).subscribe(res => {
        console.log("Label res", res);
    })
  }

  editLabel(){
    this.editlabel = "true";
  }

  deleteLabel(label){
    this.LabelService.deleteLabel(label).subscribe(res => {
      console.log("delete Label res", res);
    })
  }
}
