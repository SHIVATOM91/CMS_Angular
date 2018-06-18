import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SectionsService extends DataService {

  constructor(http:HttpClient) {
    super(http,'section')
  }

  deleteProperty(propertyId){
    return this.http.delete(this.apiUrl+'section-property/'+propertyId);
  }

}
