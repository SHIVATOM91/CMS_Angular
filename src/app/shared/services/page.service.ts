import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../admin/services/auth.service';
import { DataService } from './data.service';



@Injectable()
export class PageService  extends DataService {

  apiUrl:String =environment.apiUrl;
  
  constructor(http:HttpClient) {
    super(http, 'pages');
  }

  getProperties(){
    return this.http.get(this.apiUrl+"page-property", this.token)
  }
}
export interface Page{
  success:boolean,
  img_url,
  title:String
}

