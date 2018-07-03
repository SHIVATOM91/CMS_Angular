import { AuthService } from './../../admin/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProjectService extends DataService {
  apiUrl:String =environment.apiUrl;
  constructor(http: HttpClient) {
    super(http, "projects");
  }

  getProjects(){
    return this.http.get(this.apiUrl+"page-property", this.token)
  }

  getSinglePosts(section_id){
    return this.http.get(this.apiUrl+"page-section/"+section_id, this.token)
  }

}