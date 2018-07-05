import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SettingService extends DataService {
  apiUrl:String =environment.apiUrl;
  constructor(http:HttpClient) {
    super(http,'app-setting')
  }
}
