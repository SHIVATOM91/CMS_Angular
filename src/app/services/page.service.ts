import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../admin/services/auth.service';



@Injectable()
export class PageService {

  apiUrl:String =environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  createPage(formData){
    return this.http.post<Page>(this.apiUrl+"page", formData , { headers: new HttpHeaders({'Authorization': 'Bearer ' + AuthService.getToken()})})
    .pipe(
      
    );
  }
}
export interface Page{
  success:boolean,
  img_url
}

