import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../admin/services/auth.service';



@Injectable()
export class PageService {

  apiUrl:String =environment.apiUrl;
  header={ headers: new HttpHeaders({'Authorization': 'Bearer ' + AuthService.getToken()})};
  constructor(private http:HttpClient) { }

  createPage(formData){
    return this.http.post<Page>(this.apiUrl+"page", this.header)
  }

  getAll(){
    return this.http.get(this.apiUrl+"page", this.header)
  }

  getProperties(){
    return this.http.get(this.apiUrl+"page-property", this.header)
  }
}
export interface Page{
  success:boolean,
  img_url,
  title:String
}

