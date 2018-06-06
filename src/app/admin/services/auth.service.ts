import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { finalize, tap } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface Post {
  token: string;
};

@Injectable()

export class AuthService {
  authService: any;
  apiUrl:String =environment.apiUrl;
  currentUser;
  token;
  constructor(private http:HttpClient , private router:Router) { 
  this.token= localStorage.getItem('token');
    if(this.token){
      this.currentUser=jwt_decode(this.token);
      //console.log(this.currentUser)
    }else{
      //dummy
      this.currentUser={
        "name":"user"
      }
    }
  }


  login(credentials) { 
    // get users from api
    return this.http.post<Post>(this.apiUrl+'auth/login', credentials).map(res => {
       console.log(res)
        if(res && res.token){
          localStorage.setItem('token', res.token);
          this.currentUser=jwt_decode(res.token);
          return true;
        }else{
          return false;
        }
    });
  }

  isloggedin(){
   this.token= localStorage.getItem('token');
  
    if( this.token )return true;
    else return false;
    //console.log(currentUser)
  }

 
logout()
{
    localStorage.removeItem('token');
    this.router.navigate(['admin/login']);
}

}
