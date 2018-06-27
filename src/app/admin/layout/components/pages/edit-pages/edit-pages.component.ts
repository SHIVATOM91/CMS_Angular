import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../../shared/services/page.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-pages',
  templateUrl: './edit-pages.component.html',
  styleUrls: ['./edit-pages.component.css']
})
export class EditPagesComponent implements OnInit {
  
  section_id;
  editMode=false;
  section_details:any=[];
  propertyForm:FormGroup;
  property_array;
  imgUrl= environment.imgUrl;
  image=[];
  constructor(private _page:PageService , private route:ActivatedRoute , private fb:FormBuilder, private toastr: ToastrService ) { 
    this.section_id= this.route.snapshot.paramMap.get('sectionId');
    this.propertyForm=fb.group({
      page_section_id:[],
      page_section_title:[''],
      properties:fb.array([])
    })
  }

  ngOnInit() {
    this._page.getPageSections(this.section_id).subscribe(response=>{
      this.section_details=response;
      this.propertyForm.get('page_section_id').setValue(this.section_details.id);
      this.propertyForm.get('page_section_title').setValue(this.section_details.title);
      let prop = this.propertyForm.get('properties') as FormArray;
      this.section_details.page_section_props.forEach((res,index) => {
        console.log(res)
        prop.push(this.initPageProperty(res.id , res.type , res.section_properties.key , res.value , res.link  ));
      });
    });
  }

  initPageProperty(id? , type? , key? , value? , link? , image_file? ):FormGroup{
    return this.fb.group({
      id:[id],
      type:[type],
      key:[key],
      value:[value],
      link:[link],
      image_file:[]
    })
  }

  handleFileInput(item,event ,index){

    item.get('image_file').setValue(event.target.files[0]);
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image[index]=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);
    
  }

  saveProperty(){
    this._page.updatePageSection(this._page.createFormData(this.propertyForm.value)).subscribe(response=>{
      console.log(response);
      this.toastr.success('Section is updated Successfully.');    
    },
    error=>{
      this.toastr.error('There is some error in creating the Section.'); 
    })
  }

  get properties(){
    return this.propertyForm.get('properties') as FormArray;
  }
}