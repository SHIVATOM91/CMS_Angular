import { AuthService } from './../../admin/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService extends DataService {

  constructor(http: HttpClient) {
    super(http, "projects");
  }

}
