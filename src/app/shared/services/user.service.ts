import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../admin/services/auth.service';

@Injectable()
export class UserService extends DataService{
  apiUrl:String =environment.apiUrl;
  constructor(http:HttpClient) { 
    super(http,'user')
  }
  deleteUserlist(id)
{
  // return this.http.delete(this.apiUrl+"/user-delete/",+id) 
}

}
