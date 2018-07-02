import { ServicesObject } from './../services.component';
import { environment } from './../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
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
  public imageForm: FormGroup;
  localImage="";
  localArray=[];
  currentObj;
  imgUrl= environment.imgUrl;
  serviceId=null;
  constructor(private _service: ServicesService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {

    this.serviceId = this.route.snapshot.paramMap.get('serviceId');

    if(this.serviceId != null)
      this.getServiceData();

      this.updateForm=this.fb.group({
        id: [''],
        title: ['', Validators.required],
        description: [''],
        shortDescription: [''],
        image: [''],
        gallery: this.fb.array([])
      });

      this.imageForm=this.fb.group({
        image: [''],
        g_image:['']
      });
   }

  ngOnInit() {
  }


  handleFileInput(event){
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.localImage=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);
  }


  handleGaleryInput(event){
    this.imageForm.get('image').setValue(event.target.files[0]);

    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imageForm.get('g_image').setValue(myReader.result);
    }
    myReader.readAsDataURL(event.target.files[0]);
    let gallery = this.updateForm.get('gallery') as FormArray;
    gallery.controls.push(this.copyFormControl(this.imageForm));
    this.imageForm.reset();
  }

  updateService(){
    this._service.create(this._service.createFormData(this.updateForm.value)).subscribe(response=>{
      this.toastr.success('Services is published Successfully.');
    },response=>{
      this.toastr.error('There is some error in updating the service.');
    })
  }

  getServiceData(){
    this._service.getBy(this.serviceId).subscribe( response => {
      this.currentObj = response as ServicesObject;

      this.updateForm.get('id').setValue(this.currentObj.id);
      this.updateForm.get('title').setValue(this.currentObj.title);
      this.updateForm.get('description').setValue(this.currentObj.description);
      this.updateForm.get('shortDescription').setValue(this.currentObj.shortDescription);
      this.updateForm.get('image').setValue(this.currentObj.featuredImage);
    })
  }


  copyFormControl(control: FormGroup) {
    console.log(control.get('g_image'));

    let myForm = this.fb.group({
      image: [control.get('image').value],
      g_image:[control.get('g_image').value]
    });
    return myForm;
  }
}
