import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { ForgotService } from '../../../shared/services/forgot.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  view="login";
  loginFrom:any;
  errorMsg;
  successMsg;
  ferrorMsg;
  constructor(private authService:AuthService , private router:Router, private forgot:ForgotService) { }
  ngOnInit() {
     if(this.authService.isloggedin()){
      this.router.navigate(['admin/dashboard'])
     }
     this.loginFrom=new FormGroup({
      email:new FormControl(Validators.required),
      password:new FormControl(Validators.required)
     })
  }

  login(form){
    this.authService.login(form).subscribe(res=>{
        if(res){
          this.router.navigate(['admin/dashboard'])
        }else{
          this.errorMsg="Invalid Username and Password";
        }
    },error=>{
      this.errorMsg="Invalid Username and Password";
    })
  }

  getNewPass(formData){
    console.log(formData);
    this.forgot.create(formData).subscribe(response=>{
      console.log(response);
      
      this.successMsg="A reset email has been sent! Please check your email."; 
      this.ferrorMsg=""
    },response=>{
      console.log(response);
      
      this.ferrorMsg=response.error.email; 
    })
  }
}
