import { PartnersService } from './../../../../../shared/services/partners.service';
import { PartnersObject } from './../partners.component';
import { environment } from './../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-partners',
  templateUrl: './new-partners.component.html',
  styleUrls: ['./new-partners.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewPartnersComponent implements OnInit {

  public updateForm: FormGroup;
  localImage="";
  currentObj;
  imgUrl= environment.imgUrl;
  partnerId=null;
  constructor(private _service: PartnersService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {

    this.partnerId = this.route.snapshot.paramMap.get('partnerId');

    if(this.partnerId != null)
      this.getPartnerData();

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

  updatePartner(){
    this._service.create(this._service.createFormData(this.updateForm.value)).subscribe(response=>{
      this.toastr.success('Partners is published Successfully.');
    },response=>{
      this.toastr.error('There is some error in updating the service.');
    })
  }

  getPartnerData(){
    this._service.getBy(this.partnerId).subscribe( response => {
      this.currentObj = response as PartnersObject;

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
