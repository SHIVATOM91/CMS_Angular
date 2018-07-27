import { CustomValidators } from 'ng2-validation';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { ForgotService } from '../../../shared/services/forgot.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  view="login";
  loginForm;
  errorMsg;
  successMsg;
  ferrorMsg;
  capsLockEnabled:any;
  capMsg;
  constructor(private authService:AuthService , private router:Router, private forgot:ForgotService) { }
  ngOnInit() {
     if(this.authService.isloggedin()){
      this.router.navigate(['admin/dashboard'])
     }
     this.loginForm=new FormGroup({
        email:new FormControl('',[Validators.required, CustomValidators.email]),
        password:new FormControl('',Validators.required)
     })
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe(res=>{
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

  eventHandler(event) {
    let str = String.fromCharCode(event.which);
    this.capsLockEnabled = (str.toLowerCase() === str && event.shiftKey) || (str.toUpperCase() === str && !event.shiftKey);
        // console.log("Keypress. CapsLock enabled: " + this.capsLockEnabled.toString());
        if(this.capsLockEnabled==true)
       {
        this.capMsg="cap lock is on"
       }
       else{
        this.capMsg=""
       }
        // console.log(event, event.keyCode, event.keyIdentifier);
     }

}
