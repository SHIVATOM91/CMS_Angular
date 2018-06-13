import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, ControlContainer, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {

  sectionForm:FormGroup;
  closeResult;


  constructor(private modalService: NgbModal , private fb:FormBuilder) { 
    this.sectionForm = fb.group({
      sections : fb.array([
      ])
    })
    
  }

  addNewSection(){
    this.sections.push( this.fb.group({
      title:['sd',Validators.required],
      properties:this.fb.array([])
    }) );
  }

  get sections(){
    return this.sectionForm.get('sections') as FormArray;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

