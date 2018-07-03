import { AuthService } from './../../admin/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProjectCategoryService extends DataService {

  apiUrl:String =environment.apiUrl;

  constructor(http: HttpClient) {
    super(http, "project-category");
  }

  getProjectcategories(){
    return this.http.get(this.apiUrl+"project-category", this.token)
  }
}