import { environment } from './../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from './../../../../../shared/services/services.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-services',
  templateUrl: './new-services.component.html',
  styleUrls: ['./new-services.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewServicesComponent implements OnInit {

  public updateForm: FormGroup;
  localImage="";
  imgUrl= environment.imgUrl;

  constructor(private _service: ServicesService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {
    this.updateForm=fb.group({
      title: ['', Validators.required],
      description: [''],
      shortDescription: [''],
      image: ['']
    });
   }

  ngOnInit() {
  }


  handleFileInput(event){
    this.updateForm.get('image').setValue(event.target.files[0]);
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.localImage=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);
  }

  updateService(){
    this._service.create(this._service.createFormData(this.updateForm.value)).subscribe(response=>{
      console.log("hiii");

    })
  }
}
