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
      private labelService : LabelService,
      private dialogRefObj: MatDialogRef<LabelComponent>,@Inject(MAT_DIALOG_DATA) public labeldata:any ){
        console.log("Data recieved from Home page", [labeldata]);
          this.alllabels = labeldata;
        console.log("All Labels on Component:", this.alllabels);
     }

  ngOnInit() {
  }

  done()
  {
    console.log("labe req",this.label)
    this.labelService.addLabel(this.label).subscribe(res => {
        console.log("Label res", res);
        this.labelService.allLabels.push(this.label);
    })
  }


  close(){
    this.dialogRefObj.close(this.label);
  }

  editLabel(){
    this.editlabel = "true";
  }

  deleteLabel(label){
    this.labelService.deleteLabel(label).subscribe(res => {
      this.alllabels.splice(this.alllabels.indexOf(label), 1);
      console.log("delete Label res", res);
    })
  }
}
