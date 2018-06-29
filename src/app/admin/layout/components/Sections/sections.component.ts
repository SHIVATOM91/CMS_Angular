import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, ControlContainer, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionsService } from '../../../../shared/services/sections.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent  {
  sectionForm:FormGroup
  sectionList;
  constructor(private modalService: NgbModal , private fb:FormBuilder, private _sectionService:SectionsService, private toastr: ToastrService,) {
    
    this.sectionForm=fb.group({
      sections: fb.array([])
    });
    
    _sectionService.get().subscribe(response=>{
      this.sectionList=response;
      this.sectionList.forEach((sectionResponse,index) => {
        this.sections.push(this.initPageSections(sectionResponse.title , sectionResponse.id));
        let property=this.sections.controls[index].get('properties') as FormArray;
        sectionResponse.section_properties.forEach(propertyResponse => {
          property.push(this.initPropertySections(propertyResponse.key, propertyResponse.type , propertyResponse.id  ))
        })
      });

      
    });
  }

  addNewSection(){
    this.sections.push(this.initPageSections());
  }

  deleteSection(index){
    let sectionId=this.getSectionId(index).value;
    this._sectionService.delete(sectionId).subscribe(response=>{
      this.sections.removeAt(index);
    })
  }

  deleteProperty(sectionIndex, propertyIndex){
    let property = <FormArray>this.sections.controls[sectionIndex].get('properties');
    let propertyId = this.getPropertyId(sectionIndex, propertyIndex).value;
    this._sectionService.deleteProperty(propertyId).subscribe(response=>{
        property.removeAt(propertyIndex);
    })
    
  }

  addNewProperty(section){
    section.get('properties').push(this.initPropertySections()); 
  }

  publishSections(){
    this._sectionService.create(this.sectionForm.value).subscribe(response=>{
      this.toastr.success('Section Published Successfully.');
    },
    error=>{
      this.toastr.error('There is some error in creating the section.');

    })
  }

  initPropertySections(key? , type? , id?):FormGroup{
    return this.fb.group({
      id:[id],
      key: [key,Validators.required],
      type: [type,Validators.required]
    });
  }

  initPageSections(title? , id?):FormGroup{
    return this.fb.group({
      id:[id],
      title:[title,Validators.required],
      properties:this.fb.array([])
    })
  }

  get sections(){
    return this.sectionForm.get('sections') as FormArray;
  }

  getSectionId(sectionIndex){
    return this.sections.controls[sectionIndex].get('id');
  }

  getPropertyId(sectionIndex, propertyIndex){
    let property =this.sections.controls[sectionIndex].get('properties') as FormArray;
    return property.controls[propertyIndex].get('id')
  }
}