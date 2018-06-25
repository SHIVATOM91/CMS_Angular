import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BannerService extends DataService{

  constructor(http:HttpClient) {
    super(http, "banner");
  }
}
