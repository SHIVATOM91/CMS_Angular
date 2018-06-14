import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BannerTypeService extends DataService{


  constructor(http:HttpClient) {
    super(http, 'banner-type');
 }

}
