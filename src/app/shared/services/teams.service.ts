import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class TeamsService extends DataService {
  apiUrl:String =environment.apiUrl;
  constructor(http:HttpClient) {
    super(http,'teams')
  }

getTeams()
{
  return this.http.get(this.apiUrl+"teams", this.token)
}
}
