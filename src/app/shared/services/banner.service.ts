import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()

export class BannerService {

  apiUrl:String =environment.apiUrl;
  constructor(private http:HttpClient) {

  }

  getAllBanner(){
    return this.http.get<Banner>(this.apiUrl+"banner")
  }
  postBanner(bannerData){
    //return this.http.post<Banner>(this.apiUrl+"/banner", bannerData, httpOptions)
    return this.http.post<Banner>(this.apiUrl+"banner", bannerData)
    .pipe(

    );
  }
  updateBanner(bannerData){
    //return this.http.post<Banner>(this.apiUrl+"/banner", bannerData, httpOptions)
    return this.http.put<Banner>(this.apiUrl+"banner", bannerData)
    .pipe(

    );
  }
}

export interface Banner{
  success:boolean,
  img_url
}
