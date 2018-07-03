import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServicesService extends DataService {

  constructor(http:HttpClient) {
    super(http,'services')
  }

  deleteGalery(id){
    return this.http.delete(this.apiUrl+"services/gallery/"+id);
  }
}
