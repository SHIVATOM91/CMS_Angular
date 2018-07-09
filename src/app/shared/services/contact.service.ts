import { AuthService } from './../../admin/services/auth.service';
import { Injectable } from '@angular/core';
import { DataService } from './../../shared/services/data.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ContactService extends DataService {
  apiUrl:String =environment.apiUrl;
  constructor(http:HttpClient) {
    super(http, "contact");
  }
 
}