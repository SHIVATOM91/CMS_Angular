import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFrom:any;
  errorMsg;
  constructor(private authService:AuthService , private router:Router) { }
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
          this.errorMsg="Invalid Username and Password"
        
        }
    })
  }
}
