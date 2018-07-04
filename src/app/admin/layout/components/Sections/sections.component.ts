import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, ControlContainer, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionsService } from '../../../../shared/services/sections.service';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent  {
  sectionForm:FormGroup;
  modalForm:FormGroup;
  sectionList;
  editing = {};
  rowIndex=0;
  @ViewChild('sectionDatatable')  sTable:any;
  @ViewChild('content')  content:any;
  
  constructor(private modalService: NgbModal ,  private fb:FormBuilder, private _sectionService:SectionsService, private toastr: ToastrService) {

    this.sectionForm=fb.group({
      sections: fb.array([])
    });

    this.modalForm=fb.group({
      id:[],
      title: [],
      properties:fb.array([]),
    });
    
    this.updateList();
  }

  updateList(){
    this._sectionService.get().subscribe(response=>{
      this.sectionList=[];
      this.sections.controls=[];  
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
    this.modalService.open(this.content);
    //
    //this.sectionList.unshift({id:112 , title:"dsdsd" , created_at: "2018-06-29 10:23:20", updated_at: "2018-06-29 10:23:20"});
  }

  rowEditMode(index,status){
    for (var key in this.sectionList) {
      this.editing[index + '-title']=status;
    }
  }
  updateEditValue(rowIndex , value ){
    this.editing[rowIndex + '-title']=false;
    this.sections.controls[rowIndex].get('title').setValue(this.editing[rowIndex + '-value']);
    console.log(this.sectionForm.value)
    this.publishSections();
    this.updateList();
    

  }
  saveSection(saveSection){
    this.sections.push(saveSection);
    this.publishSections();
    this.updateList();
    this.modalForm.reset();
  }

  deleteSection(index){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'Message from popup aessage from popup ';
    
    modalRef.result.then((result) => {
      if(result){
        let sectionId=this.getSectionId(index).value;
        this._sectionService.delete(sectionId).subscribe(response=>{
          this.updateList();
        })
      }
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  deleteProperty(sectionIndex, propertyIndex){
    let property = <FormArray>this.sections.controls[sectionIndex].get('properties');
    let propertyId = this.getPropertyId(sectionIndex, propertyIndex).value;
    this._sectionService.deleteProperty(propertyId).subscribe(response=>{
      property.removeAt(propertyIndex);
    })
  }

  addNewProperty(row , index){
    let prop=this.sections.controls[index].get('properties') as FormArray;
    prop.push(this.initPropertySections()); 
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

  getIdByRow(row){
    return this.sectionList.indexOf(row);
  }

  getSectionId(sectionIndex){
    return this.sections.controls[sectionIndex].get('id');
  }

  getPropertyId(sectionIndex, propertyIndex){
    let property =this.sections.controls[sectionIndex].get('properties') as FormArray;
    return property.controls[propertyIndex].get('id')
  }

  toggleExpandRow(row,index) {
    //this.rowIndex=index;
    console.log(this)
    this.sTable.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}