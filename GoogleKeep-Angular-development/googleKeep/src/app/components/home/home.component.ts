import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { MatDialog ,MatDialogConfig, MAT_DIALOG_DATA} from "@angular/material";
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { UserResponse } from '../../model/userresponse';
import { NoteService } from '../../services/note.service';
import { LabelComponent } from '../label/label.component';
import { ViewService } from '../../services/view.service';


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
                             private builder: FormBuilder) {

    
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
  }

  /**@method: This method is for getting the logged user */
  // loggedUser() {
  //   this.httpServiceObject.getUser('getuser').subscribe(response => {
  //     this.name = response.name;
  //     this.email = response.email;
  //     console.log('User information', this.user);
  //   });
  // }

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
      },
      err => {
        console.log("Labels error is :", err);

      });
  }



}
