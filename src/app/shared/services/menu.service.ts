import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService extends DataService{

  constructor(http:HttpClient) {
      super(http, 'menu');
   }


   getPages(){
     return this.http.get(this.apiUrl+"page/slug",this.token);
   }

}
