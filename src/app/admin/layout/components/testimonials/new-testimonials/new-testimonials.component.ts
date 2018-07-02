import { TestimonialsService } from './../../../../../shared/services/testimonials.service';
import { TestimonialsObject } from './../testimonials.component';
import { environment } from './../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-testimonials',
  templateUrl: './new-testimonials.component.html',
  styleUrls: ['./new-testimonials.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewTestimonialsComponent implements OnInit {

  public updateForm: FormGroup;
  localImage="";
  currentObj;
  imgUrl= environment.imgUrl;
  testimonialId=null;
  constructor(private _service: TestimonialsService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {

    this.testimonialId = this.route.snapshot.paramMap.get('testimonialId');

    if(this.testimonialId != null)
      this.getTestimonialData();

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

  updateTestimonial(){
    this._service.create(this._service.createFormData(this.updateForm.value)).subscribe(response=>{
      this.toastr.success('Testimonials is published Successfully.');
    },response=>{
      this.toastr.error('There is some error in updating the service.');
    })
  }

  getTestimonialData(){
    this._service.getBy(this.testimonialId).subscribe( response => {
      this.currentObj = response as TestimonialsObject;

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
