/**
* @author: SANA SHAIKh
* @since: 6/06/2018
* @description: This is Forgot password service which calls http service
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

@Injectable()
export class ForgotPassService {

  constructor(private httpserviceObj: HttpService) { }

  forgot(model): Observable<any>{
    return this.httpserviceObj.postService('forgetpassword', model);
  }
}