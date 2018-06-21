import { AuthService } from './../../admin/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PostCategoryService extends DataService {

  constructor(http: HttpClient) {
    super(http, "post-category");
  }

}
