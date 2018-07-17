import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotService } from '../../../shared/services/forgot.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  token;
  successMsg;
  errorMsg
  constructor(private route:Router, private router:ActivatedRoute, private _service: ForgotService) {
    this.token=this.router.snapshot.paramMap.get('token');
    console.log(this.token);
    
  }


  ngOnInit() {

  }

  resetPassword(formData){
    this._service.resetPassword(formData).subscribe(response=>{
      console.log(response);
      
      this.successMsg="Password changed Successfully";
      this.errorMsg="";
    },error=>{
      this.errorMsg="Error";
      this.successMsg="";
    })
  }

}
