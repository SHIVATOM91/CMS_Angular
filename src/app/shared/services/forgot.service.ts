import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class ForgotService extends DataService{

  constructor(http:HttpClient) { 
    super(http,"reset-link")
  }

  resetPassword(data){
    return this.http.post(this.apiUrl+"reset-password", data);
  }

}
