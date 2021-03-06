import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../model/userresponse';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {

  model: any = {};
  UserResponse :UserResponse;
  NoteOwnerResponse :any={};
   collabArr : UserResponse[]=[];
  constructor(
    private UserService :UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public MatRef: MatDialogRef<CollaboratorComponent>
  )
   {
    this.UserService.getUserByIdEs(this.data.note.userId).subscribe(res=>{
      console.log("Note Owner res in collaborator :",res);
      this.NoteOwnerResponse = res;
     });
     
     this.data.collaboratorId.forEach(element => {
       this.UserService.getUserByIdEs(element).subscribe(res=>{
          this.UserResponse = res;
          this.collabArr.push(this.UserResponse);
        });
     });
   }

  ngOnInit() {
     
  }

  addCollab(){
    if(this.model.personEmail){
      this.UserService.getUserByEmail(this.model.personEmail).subscribe(res=>{ 
         this.UserResponse = JSON.parse(res[0]);      
          this.UserService.addCollaborator(this.UserResponse.userId,this.data.note.noteId).subscribe(res=>{
             console.log("successfull collaborate user :",res);
          });
        });
    }
  }

  removeCollab(user){
      this.UserService.removeCollaborator(this.data.note.noteId,user.userId).subscribe(res=>{
        console.log("successfull remove collaborate user :",res);
     });
  }
}
