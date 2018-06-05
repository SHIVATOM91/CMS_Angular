import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable()
export class DataModalService {
  apiRoot: string = " http://192.168.0.15:80"; 
  constructor(private http:HttpClient) { }

  register(signUpFrom){
    let url = this.apiRoot+"/register/register";
    //var fd = new FormData();
   /* fd.append('user_name', 'sample');
    fd.append('password', 'sample');*/
    console.log(signUpFrom)
    return this.http.post(url, signUpFrom );
   // console.log("Form Submitted!");
  }
 
  uploadUser(users){
    //let url = this.apiRoot+"/restapicode/register/register";
    let url = this.apiRoot+"/api/employees";
    console.log(users)
    //let url =" https://jsonplaceholder.typicode.com/posts";
      return this.http.post(url, users );
  }
  getAllEmployee(){
    let url = this.apiRoot+"/api/getAllEmp";
    //let url =" https://jsonplaceholder.typicode.com/posts";
      return this.http.get(url);
  }
  getEmpById(id){
    let url = this.apiRoot+"/api/getEmpId?id="+id;
    //let url =" https://jsonplaceholder.typicode.com/posts";
      return this.http.get(url);
  }
}
