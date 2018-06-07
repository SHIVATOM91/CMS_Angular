import { StatusResponse } from './../models/status-response';
import { AuthService } from './../../admin/services/auth.service';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  apiUrl:String =environment.apiUrl;
  token= { headers: new HttpHeaders({'Authorization': 'Bearer ' + AuthService.getToken()})}
  constructor(public http: HttpClient, public url) { }

  get(){
    return this.http.get(this.apiUrl+this.url,this.token);
  }

  create(formData){
    return this.http.post<StatusResponse>(this.apiUrl+this.url, formData);
  }

  update(id,formData){
    return this.http.put<StatusResponse>(this.apiUrl+this.url+"/"+id, formData);
  }

  delete(id){
    return this.http.delete<StatusResponse>(this.apiUrl+this.url+"/"+id);
  }

}
