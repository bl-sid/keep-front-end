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
  constructor(
    private UserService :UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public MatRef: MatDialogRef<CollaboratorComponent>
  )
   {
     console.log("In collaborator data is",data.note.userId);
     this.UserService.getUserById(data.note.userId).subscribe(res=>{
      this.UserResponse = JSON.parse(res)
       console.log("Owner :" , this.UserResponse); 
      }); 
    }

  ngOnInit() {
      // this.UserService.getUser().subscribe(res=>{
      //     console.log("Notes Response is :",res);
      //   });
  }

  addCollab(){
    
    if(this.model.personEmail){
      this.UserService.getUserByEmail(this.model.personEmail).subscribe(res=>{
         this.UserResponse = JSON.parse(res)
         console.log("user id bhetal re bho :",this.UserResponse.userId);
         console.log("add collab Response in user :",this.UserResponse ); 


         this.UserService.addCollaborator(this.UserResponse.userId,this.data.note.noteId).subscribe(res=>{

            console.log("add collab",res);
         });     
        });

        
   
    }
    
     
}
}
