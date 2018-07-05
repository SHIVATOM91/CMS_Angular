import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../admin/services/auth.service';

@Injectable()
export class ServicesService extends DataService {
  apiUrl:String = environment.apiUrl;
  constructor(http:HttpClient) {
    super(http,'services')
  }

  getServices(){
    return this.http.get(this.apiUrl+"services", this.token)
  }
  

  deleteGalery(id){
    return this.http.delete(this.apiUrl+"services/gallery/"+id);
  }
}
