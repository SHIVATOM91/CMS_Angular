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
    }else{
      //dummy
      this.currentUser={
        "name":"user"
      }
    }
  }
  public static getToken() {
      return localStorage.getItem('token');
  }

  login(credentials) { 
    return this.http.post<Post>(this.apiUrl+'auth/login', credentials).map(res => {
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
  }

  logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['admin/login']);
  }
 
<<<<<<< HEAD
logout()
{
  localStorage.removeItem('token');
  this.router.navigate(['admin/login']);
}

}
=======
}
>>>>>>> b254fe2008fe526d3de0bdeb7716667f77fa418e
