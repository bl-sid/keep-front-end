import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { UserResponse } from '../../model/userresponse';
import { NoteService } from '../../services/note.service';
import { LabelComponent } from '../label/label.component';
import { ViewService } from '../../services/view.service';
import { LabelService } from '../../services/label.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ViewService]
})
export class HomeComponent implements OnInit {

  labelarray: any = [];
  labels: any;
  grid: boolean = false;
  list: boolean = true;
  search: boolean = false;
  searchicon: boolean = true;
  searchcolor: boolean = false;
  public res;

  screenWidth: number;
  labeldata: any[];
  model: any = {};
  name: string;
  email: string;
  user: UserResponse[];
  searchForm: FormGroup;
  inputFormControl: FormControl;
  logedUser : any={};
 
  reminder = '/assets/icons/remind.png';
  crossSvg = '/assets/icons/cross.svg';
  title = "Google Keep";
  titlesmall = "Keep";

  constructor(private dialog: MatDialog,
    private activatedroute: ActivatedRoute,
    private httpServiceObject: HttpService,
    private router: Router,
    private noteServiceObj: NoteService,
    private viewServiceObj: ViewService,
    private builder: FormBuilder,
    private labelService: LabelService,
    private UserService: UserService) {


    //this.getLabel();
    this.inputFormControl = new FormControl();
    this.searchForm = this.builder.group({
      inputFormControl: this.inputFormControl
    });




    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;

      // Get Labels Serivce Call

      //this.getLabel();
      //this.getLabel();

    }
  }

  ngOnInit() {
    this.getLabel();
    this.loggedUser();
  }

  /**@method: This method is for getting the logged user */
   loggedUser() {
     this.UserService.getLoggedUser().subscribe(response => {
       console.log('User information got ', response);
       this.logedUser =  response;
     });
   }

  /**@method: This method is for logout */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  notify(): void {
    alert("No notification");
  };


  changeView() {
    //this.noteServiceObj.changeView();
    if (this.list == true) {

      this.grid = true;
      this.list = false;
    }
    else {
      this.list = true;
      this.grid = false;
    }

    this.viewServiceObj.gridview()


  }

  viewgrid() {
    //this.noteServiceObj.changeView();
    this.grid = true;
    this.list = false;
  }

  viewsearch() {

    this.search = true;
    this.searchicon = false;
  }

  searchtext() {
    if (this.searchcolor == true)
      this.searchcolor = false;
    else
      this.searchcolor = true;
  }

  // openLabel(){
  //   this.dialog.open(LabelComponent,
  //     {
  //       data:this.labels
  //     }
  //   );
  // }

  addLabel() {

    let dialog = this.dialog.open(LabelComponent,
      {
        data: this.labels
      });

    dialog.afterClosed()
      .subscribe(res => {
        this.labeldata = res;
        this.getLabel();
      });

  }

  getLabel() {
    this.noteServiceObj.getLabel("notes/label/getlabels")
      .subscribe(res => {
        this.res = res;
        this.labels = this.res;
        this.labelService.allLabels = this.labels;
      },
        err => {
          console.log("Labels error is :", err);

        });
  }

  triggerImageUpload() {
    document.getElementById('image-upload-button').click();
  }

  profileImageUpload($event) {
    this.UserService.imageUpload($event.target.files[0]).subscribe(res => {
      console.log("res.responseMessage", res.responseMessage);
    });
  }

}
