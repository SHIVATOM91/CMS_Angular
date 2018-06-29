import { ServicesObject } from './../services.component';
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
  currentObj;
  imgUrl= environment.imgUrl;
  serviceId=null;
  constructor(private _service: ServicesService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {

    this.serviceId = this.route.snapshot.paramMap.get('serviceId');

    if(this.serviceId != null)
      this.getServiceData();

    this.updateForm=fb.group({
      id: [''],
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

  getServiceData(){
    this._service.getBy(this.serviceId).subscribe( response => {
      this.currentObj = response as ServicesObject;
      console.log(this.currentObj);

      this.updateForm.get('id').setValue(this.currentObj.id);
      this.updateForm.get('title').setValue(this.currentObj.title);
      this.updateForm.get('description').setValue(this.currentObj.description);
      this.updateForm.get('shortDescription').setValue(this.currentObj.shortDescription);
      this.updateForm.get('image').setValue(this.currentObj.featuredImage);
      // for(let i=0;i<this.currentObj.post_categories.length; i++){
      //   this.presentArray.push(this.currentObj.post_categories[i].id);
      // }
      // this.initializeCategory();
    })
  }
}
