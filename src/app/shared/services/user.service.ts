import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class UserService extends DataService{
  constructor(http:HttpClient) { 
    super(http,'user')
  }

}
